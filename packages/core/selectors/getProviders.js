import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

/**
 * Select the api root component names.
 *
 * @param {object} state Redux state
 * @return {function} Redux selector
 */
const getProviders = createSelector(
  [
    get('components.providers'),
  ],
  (providers) => {
    const providerNames = Object.keys(providers);
    return Array.isArray(providerNames) ? providerNames : [];
  }
);

export default getProviders;
