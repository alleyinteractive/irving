/* eslint-disable global-require, no-console */
const { server } = require('@automattic/vip-go');

const {
  PORT = 3001,
  NODE_ENV,
} = process.env;

/* eslint-disable global-require, no-console, import/order */
module.exports = function startServer(app) {
  let vipServer;

  console.log('in-vip-go');

  if ('development' !== NODE_ENV) {
    vipServer = server(app, { PORT });
    vipServer.listen();
  }

  return vipServer;
};
