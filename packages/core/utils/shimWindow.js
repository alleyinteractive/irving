const shimWindow = window || {};

if (global && 'undefined' === typeof window) {
  const { HOSTNAME, PORT } = process.env;

  shimWindow.location = {
    host: HOSTNAME && PORT ? `${HOSTNAME}:${PORT}` : 'localhost:3001',
    port: PORT,
    hostname: HOSTNAME || 'localhost',
  };
}

shimWindow.addEventListener = window.addEventListener || (() => {});

shimWindow.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
  IntersectionObserver: () => {},
}));

shimWindow.IntersectionObserver = window.IntersectionObserver ||
  function IntersectionObserver() {
    this.observe = () => {};
    this.unobserve = () => {};
    this.disconnect = () => {};
  };

export default shimWindow;
