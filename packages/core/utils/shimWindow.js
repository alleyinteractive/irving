if (global && 'undefined' === typeof window) {
  const { HOSTNAME, PORT } = process.env;
  global.window = {
    location: {
      host: HOSTNAME && PORT ? `${HOSTNAME}:${PORT}` : 'localhost:3001',
      port: PORT,
      hostname: HOSTNAME || 'localhost',
    },
  };
}

window.addEventListener = window.addEventListener || (() => {});

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
  IntersectionObserver: () => {},
}));

window.IntersectionObserver = window.IntersectionObserver ||
  function IntersectionObserver() {
    this.observe = () => {};
    this.unobserve = () => {};
    this.disconnect = () => {};
  };
