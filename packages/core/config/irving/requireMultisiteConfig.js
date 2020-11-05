import uniq from 'lodash/uniq';
import multisiteConfig from '@irvingjs/multisite.config';

const config = (() => {
  // If no configuration exists, return null.
  if (0 === multisiteConfig.length) {
    return null;
  }
  // If a configuration exists, ensure it is only returned once in a flat array.
  return uniq(multisiteConfig, 'domain').flat();
})();

export default config;
