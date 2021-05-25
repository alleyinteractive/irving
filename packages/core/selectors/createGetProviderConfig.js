import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

/**
 * Create a selector that will return the currently set config for a root provider.
 *
 * @returns {function} - Redux selector
 */
const createGetProviderConfig = () => createSelector(
  [
    get('components.providers'),
    (state, props = {}) => props.name,
  ],
  (providers, name) => {
    if (!name || !providers) {
      return {};
    }

    const currentProvider = providers[name];

    if (currentProvider) {
      return currentProvider.current;
    }

    return {
      config: {},
      children: [],
    };
  },
);

export default createGetProviderConfig;
