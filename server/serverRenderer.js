/* eslint-disable import/first */
require('source-map-support').install();

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import queryString from 'query-string';
import rootReducer from 'reducers';
import { actionLocationChange } from 'actions';
import App from 'components/app';
import ErrorMessage from 'components/errorMessage';
import CssProvider from 'components/hoc/CssProvider';
import defaultState from 'reducers/defaultState';
import locationSaga from 'sagas/locationSaga';
import getWebpackScripts from 'utils/getWebpackScripts';
import { createGetCss } from 'utils/css';
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
 * @param {string[]} clientScripts - an array of required client scripts to be
 *                                   rendered
 */
const render = async (req, res, clientScripts) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(sagaMiddleware)
  );

  const { getState, dispatch } = store;
  const search = queryString.stringify(req.query, { arrayFormat: 'bracket' });

  // Sync express route match with route state.
  dispatch(actionLocationChange('PUSH', {
    pathname: req.path,
    search,
    hash: '', // Only available in browser.
  }));

  // Process location handling.
  await sagaMiddleware.run(locationSaga).toPromise;

  const { redirectTo, status } = getState().route;

  monitor.logTransaction(req.method, status, 'server render');

  // Redirect before trying to render.
  if (redirectTo) {
    res.redirect(status, redirectTo);
    return;
  }

  // Container for critical css related to this page render.
  const critical = [];
  // It is imperative that the server React component tree matches the client
  // component tree, so that the client can re-hydrate the app from the server
  // rendered markup, otherwise the app will be completely re-rendered.
  const html = renderToString(
    <Provider store={store}>
      <CssProvider insertCss={createGetCss(critical)}>
        <App />
      </CssProvider>
    </Provider>
  );
  // Clear head data to avoid memory leak.
  const helmet = Helmet.renderStatic();
  // https://redux.js.org/recipes/server-rendering#security-considerations
  const stateEncoded = JSON.stringify(getState()).replace(/</g, '\\u003c');

  res.status(status);
  res.render('app', {
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    criticalCss: critical.join(''),
    title: helmet.title.toString(),
    preRenderedHtml: html,
    preloadedState: stateEncoded,
    scripts: clientScripts,
  }, (err) => {
    throw err; // Throw any render errors, so we can handle them like other errors.
  });

  debugRequest({ url: req.originalUrl, status });
};

/**
 * A webpack hot server compatible middleware.
 * @param {object} options - the webpack bundle information for server and
 *                           client configs
 * @returns {function} - an express route middleware function responsible for
 *                       rendering the html response
 */
export default function serverRenderer(options) {
  return async function renderMiddleware(req, res) {
    // React 16 Error Boundaries do not work for SSR, so we must manually handle exceptions.
    try {
      await render(req, res, getWebpackScripts(options.clientStats));
    } catch (err) {
      const css = [];
      const html = renderToString(
        <CssProvider insertCss={createGetCss(css)}>
          <ErrorMessage />
        </CssProvider>
      );

      res.status(500);
      res.render('error', {
        css: css.join(''),
        html,
      });

      debugError({ url: req.originalUrl, err });
    }
  };
}
