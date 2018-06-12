/* eslint-disable import/first */
require('source-map-support').install();

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import CssProvider from 'components/hoc/CssProvider';
import App from 'components/app';
import defaultState from 'config/defaultState';
import getWebpackScripts from 'utils/getWebpackScripts';
import { createGetCss } from 'utils/css';

/**
 * Handle rendering the app as a string that can be returned as a response from
 * the server.
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {string[]} clientScripts - an array of required client scripts to be
 *                                   rendered
 */
const render = (req, res, clientScripts) => {
  const store = createStore(rootReducer, defaultState);
  // Container for all css that needs to be available for this page render.
  const critical = [];
  const html = renderToString(
    <Provider store={store}>
      <CssProvider insertCss={createGetCss(critical)}>
        <App />
      </CssProvider>
    </Provider>
  );
  // Clear head data to avoid memory leak.
  const helmet = Helmet.renderStatic();

  res.render('app', {
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    criticalCss: critical.join(''),
    title: helmet.title.toString(),
    preRenderedHtml: html,
    preloadedState: store.getState(),
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
