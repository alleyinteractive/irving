/* eslint-disable global-require */
let getMonitorService;

if (
  process.env.IRVING_EXECUTION_CONTEXT ||
  'test' === process.env.BABEL_ENV
) {
  getMonitorService = require('@irvingjs/services/monitorService');
} else {
  getMonitorService = require('./getServiceFromFilesystem');
}

module.exports = getMonitorService;
