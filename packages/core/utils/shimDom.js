const { JSDOM } = require('jsdom');
const { window: shim } = new JSDOM('<!doctype html>', {
  url: process.env.ROOT_URL || 'localhost:3001',
});

shim.addEventListener = () => {};
shim.matchMedia = () => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
});
shim.IntersectionObserver = function IntersectionObserver() {
  this.observe = () => {};
  this.unobserve = () => {};
  this.disconnect = () => {};
};

module.exports = shim;
