import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

/**
 * Create a selector that will return the root provider component by the component's
 * name.
 *
 * @returns {function} - Redux selector
 */
const createGetProviderConfig = () => createSelector(
  [
    get('components.providers'),
    (state, providerName = '') => providerName,
  ],
  (providers, providerName) => {
    if (! providerName || ! providers) {
      return {};
    }

    const currentProvider = providers[providerName];

    if (currentProvider) {
      return currentProvider.current.config;
    }

    return {};
  }
);

export default createGetProviderConfig;
