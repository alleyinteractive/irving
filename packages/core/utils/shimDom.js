const { HOSTNAME, PORT } = process.env;
const isBrowser = 'undefined' !== typeof window;
const shimDom = {
  location: isBrowser ? window.location : {
    host: HOSTNAME && PORT ? `${HOSTNAME}:${PORT}` : 'localhost:3001',
    port: PORT,
    hostname: HOSTNAME || 'localhost',
  },
  addEventListener: isBrowser ? window.addEventListener : (() => {}),
  matchMedia: isBrowser ? window.matchMedia : (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  })),
  IntersectionObserver: isBrowser ? window.IntersectionObserver :
    function IntersectionObserver() {
      this.observe = () => {};
      this.unobserve = () => {};
      this.disconnect = () => {};
    },
};

export default shimDom;
