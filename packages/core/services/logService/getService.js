/* eslint-disable global-require */
let getLogService;

if (
  process.env.IRVING_EXECUTION_CONTEXT ||
  'test' === process.env.BABEL_ENV
) {
  getLogService = require('@irvingjs/services/logService');
} else {
  getLogService = require('./getServiceFromFilesystem');
}

module.exports = getLogService;
