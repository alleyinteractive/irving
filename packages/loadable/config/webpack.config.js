const { ReactLoadablePlugin } = require('react-loadable/webpack');
const path = require('path');
// const { buildContext } = require('@irvingjs/core/config/paths');

module.exports = {
  plugins: [
    new ReactLoadablePlugin({
      filename: path.join(process.cwd(), 'build/react-loadable.json'),
    }),
  ],
};
