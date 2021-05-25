/* eslint-disable global-require, no-console */
const { server } = require('@automattic/vip-go');

const {
  PORT = 3001,
  NODE_ENV,
} = process.env;

/* eslint-disable global-require, no-console, import/order */
module.exports = function startServer(app) {
  let vipServer;

  if (NODE_ENV !== 'development') {
    vipServer = server(app, { PORT });
    vipServer.listen();
  }

  return vipServer;
};
