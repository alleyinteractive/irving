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
import defaultState from 'reducers/defaultState';
import getEnv from 'config/webpack/env';
import resolveComponents from 'sagas/resolveComponents';
import getWebpackScripts from 'utils/getWebpackScripts';
import addTrailingSlash from 'utils/addTrailingSlash';
import getLogService from 'services/logService';
import getService from 'services/monitorService';
import App from 'components/app';
import getComponent from 'config/componentMap';
import getTemplateVars from './getTemplateVars';

const monitor = getService();
const logError = getLogService('irving:render:error');
const logRequest = getLogService('irving:render:request');

/**
 * Handle rendering the app as a string that can then be returned as a response
 * from the server.
 * @param {object} req - express request object
 * @param {object} res - express response object to be rendered.
 **/
const render = async (req, res, clientStats) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(sagaMiddleware)
  );
  const { getState, dispatch } = store;
  const search = queryString.stringify(req.query, { arrayFormat: 'bracket' });
  const trailingSlash = addTrailingSlash(req.path);

  // Redirect to path with trailling slash before dispatching location change.
  if (req.path !== trailingSlash) {
    res.redirect(trailingSlash);
    return;
  }

  // Sync express request with route state.
  dispatch(actionLocationChange('PUSH', {
    pathname: req.path,
    search: `?${search}`,
    cookie: req.universalCookies.getAll({ doNotParse: true }),
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
  logRequest.info('%o', { url: req.originalUrl, status });

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
  const customTemplateVars = getTemplateVars('getAppTemplateVars', {
    Wrapper: AppWrapper,
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
    preRenderedState: stateEncoded,
    env: JSON.stringify(getEnv()),
    ...customTemplateVars,
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
      logError.error('%o', { url: req.originalUrl, err });

      // Render a error page.
      const cssBuilder = new CriticalCssBuilder();
      const ErrorMessageComponent = getComponent('error-message');
      const ErrorMessageWrapper = () => (
        <StyleContext.Provider value={cssBuilder.addCss}>
          <ErrorMessageComponent />
        </StyleContext.Provider>
      );

      // Get some template vars and allow customization by user.
      const customTemplateVars = getTemplateVars('getErrorTemplateVars', {
        Wrapper: ErrorMessageWrapper,
        irvingHead: '',
      });
      const templateVars = {
        criticalCss: cssBuilder.getCss(),
        ...customTemplateVars,
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
