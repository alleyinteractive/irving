module.exports = (configs) => {
  return configs.map((config) => {
    if ('client' === config.name) {
      console.log('bingbong');
    }
  });
};
