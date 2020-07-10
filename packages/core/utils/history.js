const isNode = require('./isNode').default;

let createHistory; // eslint-disable-line import/no-mutable-exports
/* eslint-disable global-require */
// Create a shim history interface for NodeJS executed code.
// We could use memoryHistory, but we cannot rely on a singleton, as the same
// object instance would be reused for all requests leading to inconsistent
// state and an eventual memory leak.
if (isNode()) {
  createHistory = () => ({
    push: () => {},
    replace: () => {},
    go: () => {},
    goBack: () => {},
    goForward: () => {},
    canGo: () => {},
  });
} else {
  createHistory = require('history').createBrowserHistory;
}
/* eslint-enable */

module.exports = createHistory();
