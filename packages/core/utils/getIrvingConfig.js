import irvingDefaultConfig from 'config/irving.config.default';
import userConfig from 'irving.config.js';
import merge from 'lodash/fp/merge';

export default function getIrvingConfig() {
  console.log(userConfig);

  return merge(
    userConfig,
    irvingDefaultConfig,
  );
}
