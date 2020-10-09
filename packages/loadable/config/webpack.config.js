const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { buildContext } = require('@irvingjs/core/config/paths');
const path = require('path');

module.exports = {
  plugins: [
    new ReactLoadablePlugin({
      filename: path.join(buildContext, './build/client/react-loadable.json'),
    }),
  ],
};
