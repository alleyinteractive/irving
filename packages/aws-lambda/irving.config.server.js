const serverless = require('serverless-http');
const {
  NODE_ENV,
} = process.env;

module.exports = {
  exportServer: (app) => {
    if ('development' !== NODE_ENV) {
      return serverless(app);
    }

    return app;
  }
};
