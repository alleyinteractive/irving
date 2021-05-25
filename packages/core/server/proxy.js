const { createProxyMiddleware } = require('http-proxy-middleware');
const proxyPassthrough = require('../config/proxyPassthrough');
const { getEnv } = require('../config/multisite');

// Set up a reusable proxy for responses that should be served directly.
module.exports = (app) => {
  // Create a wrapper so we have access to hostname for pulling out env.
  const proxyWrapper = (req, res, next) => {
    const {
      API_ROOT_URL,
      API_ORIGIN,
    } = getEnv(req.hostname);

    // Return early if we don't have what we need.
    if (!API_ORIGIN && !API_ROOT_URL) {
      return;
    }

    createProxyMiddleware({
      changeOrigin: true,
      followRedirects: true,
      secure: process.env.NODE_ENV !== 'development',
      target: API_ORIGIN || API_ROOT_URL.replace('/wp-json/irving/v1', ''),
      xfwd: true,
    })(req, res, next);
  };

  // Create proxies for each configured proxy pattern.
  proxyPassthrough.forEach((pattern) => {
    app.use(pattern, proxyWrapper);
  });
};
