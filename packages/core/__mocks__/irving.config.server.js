module.exports = {
  proxyPassthrough: () => ([
    '/test/**/*',
  ]),
  trailingSlashDenylist: [
    '/no-trailing-slash',
  ],
};
