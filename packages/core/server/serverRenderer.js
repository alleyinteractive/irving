/* global appView, errorView */
import 'source-map-support/register';
import React from 'react';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import queryString from 'query-string';
import { StyleContext, CriticalCssBuilder } from 'critical-style-loader/lib';
import { clearChunks } from 'react-universal-component/server';
import rootReducer from 'reducers';
import { actionLocationChange } from 'actions';
import ErrorMessage from 'components/errorMessage';
import getEnv from 'config/webpack/env';
import defaultState from 'reducers/defaultState';
import resolveComponents from 'sagas/resolveComponents';
import getWebpackScripts from 'utils/getWebpackScripts';
import createDebug from 'services/createDebug';
import getService from 'services/monitorService';
import App from 'components/app';
// @todo might want to update these to @irvingjs also.
import getAppTemplateVars from '@irving/custom/getAppTemplateVars';
import getErrorTemplateVars from '@irving/custom/getErrorTemplateVars';
import getIrvingConfig from 'utils/getIrvingConfig';

const { componentMap } = getIrvingConfig();
const monitor = getService();
const debugError = createDebug('render:error');
const debugRequest = createDebug('render:request');

/**
 * Handle rendering the app as a string that can then be returned as a response
 * from the server.
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {string[]} webpackScripts - an array of required webpack bundle scripts
 *                                   to be rendered
 */
const render = async (req, res, clientStats) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(sagaMiddleware)
  );
  const { getState, dispatch } = store;
  const search = queryString.stringify(req.query, { arrayFormat: 'bracket' });

  // Sync express request with route state.
  dispatch(actionLocationChange('PUSH', {
    pathname: req.path,
    search: `?${search}`,
    hash: '', // Only available in browser.
  }));

  // Process location handling.
  await sagaMiddleware.run(resolveComponents).toPromise();

  // logging
  const {
    redirectTo,
    redirectStatus,
    status,
  } = getState().route;
  monitor.logTransaction(req.method, status, 'server render');
  debugRequest({ url: req.originalUrl, status });

  // Redirect before trying to render.
  if (redirectTo) {
    res.redirect(redirectStatus, redirectTo);
    return;
  }

  clearChunks();

  // Container for critical css related to this page render.
  const cssBuilder = new CriticalCssBuilder();
  const AppWrapper = () => (
    <Provider store={store}>
      <StyleContext.Provider value={cssBuilder.addCss}>
        <App />
      </StyleContext.Provider>
    </Provider>
  );

  // Get some template vars and allow customization by user.
  const {
    appHtml,
    irvingHead,
  } = getAppTemplateVars(AppWrapper, {
    // Collect webpack scripts for prerender, pass in to allow addition of more tags to <head>.
    irvingHead: getWebpackScripts(clientStats).join(''),
  });

  // Clear head data to avoid memory leak.
  const helmet = Helmet.renderStatic();
  // https://redux.js.org/recipes/server-rendering#security-considerations
  const stateEncoded = JSON.stringify(getState()).replace(/</g, '\\u003c');
  const templateVars = {
    helmet,
    criticalCss: cssBuilder.getCss(),
    styleRefs: cssBuilder.getEncodedMap(),
    preRenderedHtml: appHtml,
    preRenderedState: stateEncoded,
    env: JSON.stringify(getEnv()),
    irvingHead,
  };

  res.status(status);
  res.render(appView, templateVars, (err, html) => {
    // Throw any render errors, so we can handle them like other errors.
    if (err) {
      throw err;
    }

    res.send(html);
  });
};

/**
 * Create a webpack hot server compatible middleware.
 * @param {object} options - the webpack bundle information for server and
 *                           client configs
 * @returns {function} - an express route middleware function responsible for
 *                       rendering the html response
 */
export default function serverRenderer(options) {
  return async function renderMiddleware(req, res, next) {
    // React 16 Error Boundaries do not work for SSR, so we must manually handle exceptions.
    try {
      await render(
        req,
        res,
        options.clientStats
      );
    } catch (err) {
      debugError({ url: req.originalUrl, err });

      // Render a error page.
      const cssBuilder = new CriticalCssBuilder();
      const ErrorMessageComponent = componentMap['error-message'] ||
        ErrorMessage;
      const ErrorMessageWrapper = () => (
        <StyleContext.Provider value={cssBuilder.addCss}>
          <ErrorMessageComponent />
        </StyleContext.Provider>
      );
      const {
        appHtml,
        irvingHead,
      } = getErrorTemplateVars(ErrorMessageWrapper, {
        // None of these are used by default on the error template, but provide them anyway.
        irvingHead: '',
      });
      const templateVars = {
        css: cssBuilder.getCss(),
        html: appHtml,
        irvingHead,
      };

      res.status(500);
      res.render(errorView, templateVars, (templateErr, html) => {
        // There was an error rendering the error page :(
        if (templateErr) {
          next(templateErr);
        } else {
          res.send(html);
        }
      });
    }
  };
}
