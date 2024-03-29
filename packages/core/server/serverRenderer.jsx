// Global passed in via webpack define plugin
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import queryString from 'query-string';
import rootReducer from 'reducers';
import { actionLocationChange } from 'actions';
import defaultState from 'reducers/defaultState';
import resolveComponents from 'sagas/resolveComponents';
import addTrailingSlash from 'utils/addTrailingSlash';
import getLogService from '@irvingjs/services/logService';
import getMonitorService from '@irvingjs/services/monitorService';
import App from 'components/app';
import getComponent from 'config/componentMap';
import createClientEnv from 'config/irving/createClientEnv';
import { getEnv } from 'config/multisite';
import createRouteLogTags from 'utils/createRouteLogTags';
import getWebpackAssetTags from './utils/getWebpackAssetTags';
import getTemplateVars from './utils/getTemplateVars';
import encodeState from './utils/encodeState';
import { maybeResolveUserModule } from '../utils/userModule';

const appView = maybeResolveUserModule('server/views/app.ejs');
const errorView = maybeResolveUserModule('server/views/error.ejs');
const monitor = getMonitorService();
const log = getLogService('irving:server:render');

/**
 * Handle rendering the app as a string that can then be returned as a response
 * from the server.
 *
 * @param {object} req Express request object
 * @param {object} res Express response object to be rendered.
 * @param {object} clientStats Webpack client-side build statistics object.
 * */
const render = async (req, res, clientStats) => {
  // Set up multisite env as early as possible
  const env = createClientEnv(req.hostname);

  // Check to see if we are rendering errors to the browser.
  const { IRVING_RENDER_ERRORS } = getEnv(req.hostname);

  // Initialize store and middleware.
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(sagaMiddleware),
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
    hostname: req.hostname,
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

  if (getState().error && IRVING_RENDER_ERRORS) {
    throw new Error(getState().error);
  }

  monitor.logTransaction(req.method, status, 'server render');
  log.info('%o', { url: req.originalUrl, status });

  // Redirect before trying to render.
  if (redirectTo) {
    res.redirect(redirectStatus, redirectTo);
    return;
  }

  const AppWrapper = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Get some template vars and allow customization by user.
  const customTemplateVars = getTemplateVars(
    'getAppTemplateVars',
    {
      Wrapper: AppWrapper,
      head: {
        end: [getWebpackAssetTags(clientStats, req.hostname)],
      },
    },
    clientStats,
    req.hostname,
  );

  const stateEncoded = encodeState(getState());
  const templateVars = {
    preRenderedState: stateEncoded,
    env: JSON.stringify(env),
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
 *
 * @param {object} options The webpack bundle information for server and
 *                           client configs
 * @returns {function} An express route middleware function responsible for
 *                       rendering the html response
 */
export default function serverRenderer(options) {
  return async function renderMiddleware(req, res, next) {
    // React 16 Error Boundaries do not work for SSR, so we must manually handle exceptions.
    try {
      await render(
        req,
        res,
        options.clientStats,
      );
    } catch (err) {
      log.error(
        '%O',
        { url: req.originalUrl, err },
        {
          tags: createRouteLogTags(req, getEnv(req.hostname)),
        },
      );

      // Render a error page.
      const ErrorMessageComponent = getComponent('error-message');
      const ErrorWrapper = () => (
        <ErrorMessageComponent />
      );

      // Get some template vars and allow customization by user.
      const templateVars = getTemplateVars('getErrorTemplateVars', {
        Wrapper: ErrorWrapper,
        head: {
          title: '<title>Something has gone wrong</title>',
        },
        errorToDisplay: req.query.debug || process.env.NODE_ENV === 'development'
          ? err.stack || err
          : 'This error has been logged',
      });

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
