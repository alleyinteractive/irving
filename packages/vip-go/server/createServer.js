/* eslint-disable global-require, no-console */
const { server } = require('@automattic/vip-go');
const https = require('https');

const {
  PORT = 3001,
  NODE_ENV,
  HTTPS_KEY_PATH,
  HTTPS_CERT_PATH,
} = process.env;

/* eslint-disable global-require, no-console, import/order */
module.exports = function createServer(app) {
  let server;

  if (HTTPS_KEY_PATH && HTTPS_CERT_PATH && 'development' === NODE_ENV) {
    const os = require('os');
    const fs = require('fs');
    const path = require('path');

    const key = fs.readFileSync(path.join(os.homedir(), HTTPS_KEY_PATH), 'utf8');
    const cert = fs.readFileSync(
      path.join(os.homedir(), HTTPS_CERT_PATH),
      'utf8'
    );

    server = https.createServer({ key, cert }, app);
  } else {
    server = server(app, { PORT });
  }

  return server;
}
