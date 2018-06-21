import isNode from './isNode';

let history = {}; // eslint-disable-line import/no-mutable-exports

if (! isNode()) {
  const createHistory = require('history/createBrowserHistory').default; // eslint-disable-line global-require
  console.log(createHistory);
  history = createHistory();
}

export default history;
