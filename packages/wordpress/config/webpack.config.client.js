// const path = require('path');

module.exports = (config) => {
  const newConfig = config;
  // const isEditorChunk = (chunk) => (
  //   chunk.name.includes('blockEditor')
  // );

  // // Modify splitChunks config.
  // newConfig.optimization.splitChunks = {
  //   cacheGroups: {},
  // };

  // if (config.optimization.splitChunks) {
  //   newConfig.optimization
  //     .splitChunks
  //     .cacheGroups
  //     .common = {
  //       name: 'common',
  //       chunks: (chunk) => ! isEditorChunk(chunk),
  //     };
  // }

  // newConfig.optimization
  //   .splitChunks
  //   .cacheGroups
  //   .blockEditor = {
  //     name: 'blockEditor',
  //     filename: '[name].bundle.js',
  //     chunks: 'initial',
  //     test: (module, chunks) => {
  //       if (chunks[0]) {
  //         console.log(Object.keys(chunks[0]));
  //       }
  //       const { issuer, resource } = module;

  //       if (issuer && issuer.resource) {
  //         return issuer.resource.includes('blockEditor');
  //       }

  //       if (resource) {
  //         return resource.includes('blockEditor');
  //       }

  //       return false;
  //     },
  //   };

  // // Add new entry
  // newConfig.entry.blockEditor = [
  //   path.join(__dirname, '../blockEditor.js'),
  // ];

  // console.log(config.optimization.splitChunks);

  return newConfig;
};
