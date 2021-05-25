const serverless = require('serverless-http');

const {
  NODE_ENV,
} = process.env;

module.exports = (app) => {
  if (NODE_ENV !== 'development') {
    return serverless(app);
  }

  return app;
};
