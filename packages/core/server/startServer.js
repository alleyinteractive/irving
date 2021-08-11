const http = require('http');
const https = require('https');
const logService = require('../services/logService/getServiceFromFilesystem');

const log = logService('irving:server:start');

const {
  HTTPS_KEY_PATH,
  HTTPS_CERT_PATH,
  PORT = 3001,
} = process.env;

/* eslint-disable global-require, no-console, import/order */
module.exports = function startServer(app) {
  let server;

  if (HTTPS_KEY_PATH && HTTPS_CERT_PATH) {
    const os = require('os');
    const fs = require('fs');
    const path = require('path');

    const key = fs.readFileSync(
      path.join(
        os.homedir(),
        HTTPS_KEY_PATH,
      ),
      'utf8',
    );
    const cert = fs.readFileSync(
      path.join(
        os.homedir(),
        HTTPS_CERT_PATH,
      ),
      'utf8',
    );

    server = https.createServer({ key, cert }, app);
  } else {
    server = http.createServer(app);
  }

  server.listen(PORT);
  log.info(`Server listening on port ${PORT}!`);

  return server;
};
/* eslint-enable */
