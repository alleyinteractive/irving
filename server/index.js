/* eslint-disable global-require, no-console */
const proxy = require('http-proxy-middleware');
const https = require('https');
const express = require('express');
const { server } = require('@automattic/vip-go');
const cookiesMiddleware = require('universal-cookie-express');
const fetch = require('isomorphic-fetch');
const get = require('lodash/get');

// Support isomorphic environment variables from local .env file
require('dotenv').config();

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const getService = require('../services/monitorService');
getService().start();

const createDebug = require('../services/createDebug');
const { rootUrl } = require('../config/paths');
const bustCache = require('./bustCache');
const bustPageCache = require('./bustPageCache');
const purgePageCache = require('./purgePageCache');

const debug = createDebug('server:error');
const {
  PORT = 3001,
  API_ROOT_URL,
  NODE_ENV,
  HTTPS_KEY_PATH,
  HTTPS_CERT_PATH,
} = process.env;
const app = express();

// Clearing the Redis cache.
app.get('/bust-endpoint-cache', bustPageCache);
app.get('/bust-entire-cache', bustCache);
app.purge('/*', purgePageCache);

app.set('views', 'server/views');
app.set('view engine', 'ejs');

// Set up a reusable proxy for responses that should be served directly.
const passthrough = proxy({
  changeOrigin: true,
  followRedirects: true,
  secure: 'development' !== NODE_ENV,
  target: API_ROOT_URL.replace('/wp-json/irving/v1', ''),
  xfwd: true,
});

app
  .use(cookiesMiddleware())
  .use('/irving/v1/nexus_data', async (req, res) => {
    const blaizeSession = req.universalCookies.get('blaize_session');
    async function zephrProfile() {
      try {
        const response = await fetch(
          `${process.env.ZEPHR_ROOT_URL}/blaize/account`,
          {
            headers: {
              cookie: `blaize_session=${blaizeSession}`,
            },
            credentials: 'include',
          }
        );

        const data = await response.json();
        const email = get(data, 'identifiers.email_address', false);
        return email;
      } catch (error) {
        console.log('Error confirming Zephr account', error);
        return false;
      }
    }

    const profile = await zephrProfile();

    if (! profile) {
      res.json({});
      return;
    }

    async function nexusProfile(email) {
      try {
        const response = await fetch(
          `${process.env.API_ROOT_URL}/data/nexus_user?email=${encodeURIComponent(email)}`,
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log('Error querying Nexus credentials', error);
        return false;
      }
    }

    const nexusData = await nexusProfile(profile);

    res.json(nexusData);
  });

// Proxy XML and XSL file requests directly.
app.use('/robots.txt', passthrough);
app.use('*.xml', passthrough);
app.use('/wp-json/*', passthrough);
app.use('*.rss', passthrough);
app.use('*.xsl', passthrough);
app.use('*/amp/', passthrough);
app.use('*/feed/', passthrough);
app.use('/xmlrpc.php', passthrough);
app.use('/hub/ai-effect/*', proxy({
  changeOrigin: true,
  followRedirects: true,
  secure: 'development' !== NODE_ENV,
  target: API_ROOT_URL.replace('/wp-json/irving/v1', ''),
  // eslint-disable-next-line max-len
  pathRewrite: {
    // eslint-disable-next-line max-len
    '^/hub/ai-effect/*': '/wp-content/themes/mittr/inc/static/ai-effect/',
  },
  xfwd: true,
}));
app.use('/hub/possibility-report/*', proxy({
  changeOrigin: true,
  followRedirects: true,
  secure: 'development' !== NODE_ENV,
  target: API_ROOT_URL.replace('/wp-json/irving/v1', ''),
  // eslint-disable-next-line max-len
  pathRewrite: {
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/possibility-report_files/*': '/wp-content/themes/mittr/inc/static/views/possibility-report_files/',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/move/': '/wp-content/themes/mittr/inc/static/views/move.html',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/connect/': '/wp-content/themes/mittr/inc/static/views/connect.html',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/heal/': '/wp-content/themes/mittr/inc/static/views/heal.html',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/learn/': '/wp-content/themes/mittr/inc/static/views/learn.html',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/build/': '/wp-content/themes/mittr/inc/static/views/build.html',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/grow/': '/wp-content/themes/mittr/inc/static/views/grow.html',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/all/': '/wp-content/themes/mittr/inc/static/views/all.html',
    // eslint-disable-next-line max-len
    '^/hub/possibility-report/': '/wp-content/themes/mittr/inc/static/views/possibility-report.html',
  },
  xfwd: true,
}));

app.use(cookiesMiddleware());

if ('development' === NODE_ENV) {
  require('./development')(app);
} else {
  require('./production')(app);
}

// Default error handler
app.use((err, req, res, next) => {
  debug(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.sendStatus(500);
});

let vipServer;
if (HTTPS_KEY_PATH && HTTPS_CERT_PATH && 'development' === NODE_ENV) {
  const os = require('os');
  const fs = require('fs');
  const path = require('path');

  const key = fs.readFileSync(
    path.join(
      os.homedir(),
      HTTPS_KEY_PATH,
    ),
    'utf8'
  );
  const cert = fs.readFileSync(
    path.join(
      os.homedir(),
      HTTPS_CERT_PATH,
    ),
    'utf8'
  );

  vipServer = https.createServer({ key, cert }, app);
  vipServer.listen(PORT);
  console.log(`Server listening on port ${PORT}!`);

  // Open app for convenience and to get the initial build started.
  const openBrowser = require('react-dev-utils/openBrowser');
  openBrowser(rootUrl);
} else {
  vipServer = server(app, { PORT });
  vipServer.listen();
}

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  debug(err);

  if ('production' !== NODE_ENV) {
    throw err;
  }
});
