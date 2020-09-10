import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

/**
 * Select the current route's unique key.
 * @returns {function} - Redux selector
 */
const createGetProviderConfig = (providerName) => createSelector(
  [
    get('components.providers'),
  ],
  (providers) => {
    const currentProvider = providers[providerName];

    if (currentProvider) {
      return currentProvider.current.config;
    }

    return {};
  }
);

export default createGetProviderConfig;
