import irvingDefaultConfig from 'config/irving.config.default';
import merge from 'lodash/fp/merge';
import userConfig from '@irving/irving.config';

export default function getIrvingConfig() {
  return merge(
    userConfig,
    irvingDefaultConfig,
  );
}

if (module.hot) {
  module.hot.accept();
}
