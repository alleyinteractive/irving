import isNode from './isNode';

let createHistory; // eslint-disable-line import/no-mutable-exports
/* eslint-disable global-require */
if (isNode()) {
  createHistory = require('history/createMemoryHistory').default;
} else {
  createHistory = require('history/createBrowserHistory').default;
}
/* eslint-enable */

export default createHistory();
