import 'source-map-support/register';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import queryString from 'query-string';
import { StyleContext, CriticalCssBuilder } from 'critical-style-loader/lib';
import { clearChunks } from 'react-universal-component/server';
import rootReducer from 'reducers';
import { actionLocationChange } from 'actions';
import App from 'components/app';
import ErrorMessage from 'components/errorMessage';
import getEnv from 'config/webpack/env';
import defaultState from 'reducers/defaultState';
import resolveComponents from 'sagas/resolveComponents';
import getWebpackScripts from 'utils/getWebpackScripts';
import createDebug from 'services/createDebug';
import getService from 'services/monitorService';

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
    cookie: req.universalCookies.getAll({ doNotParse: true }),
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

  // Container for critical css related to this page render.
  const cssBuilder = new CriticalCssBuilder();

  clearChunks();

  // It is imperative that the server React component tree matches the client
  // component tree, so that the client can re-hydrate the app from the server
  // rendered markup, otherwise the app will be completely re-rendered.
  const appHtml = renderToString(
    <Provider store={store}>
      <StyleContext.Provider value={cssBuilder.addCss}>
        <App />
      </StyleContext.Provider>
    </Provider>
  );

  // Collect webpack scripts for prerender
  const webpackScripts = getWebpackScripts(clientStats);

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
    webpackScripts,
  };

  res.status(status);
  res.render('app', templateVars, (err, html) => {
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
      const appHtml = renderToString(
        <StyleContext.Provider value={cssBuilder.addCss}>
          <ErrorMessage />
        </StyleContext.Provider>
      );
      const templateVars = { css: cssBuilder.getCss(), html: appHtml };

      res.status(500);
      res.render('error', templateVars, (templateErr, html) => {
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
