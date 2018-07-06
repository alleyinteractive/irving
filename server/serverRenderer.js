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
import CssProvider from 'components/hoc/CssProvider';
import App from 'components/app';
import defaultState from 'reducers/defaultState';
import locationSaga from 'sagas/locationSaga';
import getWebpackScripts from 'utils/getWebpackScripts';
import { createGetCss } from 'utils/css';

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
  await sagaMiddleware.run(locationSaga).done;

  // Redirect before trying to render.
  const { redirectTo, status } = getState().route;
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
  });
};

/**
 * A webpack hot server compatible middleware.
 * @param {object} options - the webpack bundle information for server and
 *                           client configs
 * @returns {function} - an express route middleware function responsible for
 *                       rendering the html response
 */
export default function serverRenderer(options) {
  const { clientStats } = options;
  return function renderMiddleware(req, res, next) {
    try {
      render(req, res, getWebpackScripts(clientStats));
    } catch (err) {
      next(err);
    }
  };
}
