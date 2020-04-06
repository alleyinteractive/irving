/* eslint-disable global-require, no-console */
const proxy = require('http-proxy-middleware');
const https = require('https');
const express = require('express');
const { server } = require('@automattic/vip-go');
const cookiesMiddleware = require('universal-cookie-express');

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
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const blaizeSession = req.universalCookies.get('blaize_session');

    function zephrProfile(cookie) {
      return new Promise((resolve, reject) => {
        // const payload = [];

        const request = https.request(
          {
            host: process.env.ZEPHR_ROOT_URL,
            path: '/blaize/account',
            method: 'GET',
            headers: {
              cookie,
            },
            credentials: 'include',
          },
          (result) => {
            console.log(Object.keys(result), result.headers, result.statusCode);
            if (200 !== result.statusCode) {
              reject(new Error('Request was rejected.'));
            } else {
              this.data = [];

              result.on('data', (chunk) => this.data.push(chunk.toString()));
              result.on('end', () => {
                try {
                  this.result = JSON.parse(this.data.join(''));
                  resolve(this.result);
                } catch {
                  reject(new Error('Malformed result'));
                }
              });
            }
          }
        );

        request.on('error', (err) => {
          reject(new Error(`Error querying Zephr service: ${err.toString()}`));
        });

        // request.write(payload);
        request.write('some random string, how does this work?');
        request.end();
      });
    }

    let profile;

    try {
      profile = await zephrProfile(`blaize_session: ${blaizeSession}`);
    } catch (err) {
      console.log('There was an error authenticating the user.', err);
    }
    // const profile = await zephrProfile(blaizeSession);
    console.log(profile);

    // function zephrProfile(cookie) {
    //   console.log('this is running');
    //   const request = https.request(
    //     {
    //       host: process.env.ZEPHR_ROOT_URL,
    //       path: '/blaize/account',
    //       method: 'GET',
    //       headers: {
    //         cookie,
    //       },
    //       credentials: 'include',
    //     },
    //     (result) => {
    //       console.log({ result });
    //       result.on('data', (data) => {
    //         console.log(JSON.parse(data));
    //       });
    //     }
    //   );

    //   request.on('error', (err) => {
    //     console.log({ err });
    //   });

    //   request.end();
    // }

    res.json(profile);

    // async function getAccount(sessionCookie) {
    //   try {
    //     const request = https.request(
    //       `${process.env.ZEPHR_ROOT_URL}/blaize/account`,
    //       {
    //         method: 'GET',
    //         headers: {
    //           cookie: sessionCookie,
    //         },
    //         credentials: 'include',
    //       }
    //     ).then((res) => res.json());

    //     const response = await request;

    //     const {
    //       identifiers: {
    //         email_address: emailAddress,
    //       },
    //     } = response;

    //     return { emailAddress };
    //   } catch (error) {
    //     return error;
    //   }
    // }
    // const account = getAccount(cookie);
    // console.log(account);
    // res.json(account);

    // Authenticate to zephr,
    // zephr gives user's email address
    // build the authentication header string for nexus
    // use the email that you now know is authenticated and send to wp
    // call
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
