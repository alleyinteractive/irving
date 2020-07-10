const { HOSTNAME, PORT } = process.env;
const shimDom = {
  location: {
    host: HOSTNAME && PORT ? `${HOSTNAME}:${PORT}` : 'localhost:3001',
    port: PORT,
    hostname: HOSTNAME || 'localhost',
  },
  addEventListener: (() => {}),
  matchMedia: (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  })),
  IntersectionObserver: function IntersectionObserver() {
    this.observe = () => {};
    this.unobserve = () => {};
    this.disconnect = () => {};
  },
};

export default shimDom;
