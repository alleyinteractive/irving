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

function render(req, res, clientScripts) {
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
}

export default function serverRenderer({ clientStats }) {
  return async (req, res, next) => {
    try {
      await render(req, res, getWebpackScripts(clientStats));
    } catch (err) {
      next(err);
    }
  };
}
