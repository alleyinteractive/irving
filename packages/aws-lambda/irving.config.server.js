const serverless = require('serverless-http');

module.exports = {
  exportServer: (app) => {
    return serverless(app);
  }
};
