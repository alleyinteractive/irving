// I realize this isn't actually a schema—it will be eventually.
module.exports = {
  name: '',
  babelConfig: [() => {}],
  envWhitelist: [() => []],
  cacheService: () => {},
  startServer: () => {},
  customizeServer: [() => {}],
  customizeDevServer: [() => {}],
  customizeProdServer: [() => {}],
  logService: () => {},
  defaultState: [() => {}],
  getAppTemplateVars: [() => {}],
  getErrorTemplateVars: [() => {}],
  monitorService: () => {},
  packages: [],
  postcssConfig: [() => {}],
  proxyPassthrough: [() => []],
  reducers: [() => {}],
  webpackConfig: [() => {}],
  sagas: [() => {}],
  stylelintConfig: [() => {}],
  styleguideConfig: [() => {}],
  styleguideSetup: [],
  trailingSlashBlacklist: [() => []],
};
