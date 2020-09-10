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
    // Not passing in a state param results in a function from lodash/get, hence this check.
    const providerNames = (providers && 'function' !== typeof providers) ?
      Object.keys(providers) : [];

    return (providers && Array.isArray(providerNames)) ?
      providerNames : [];
  }
);

export default getProviders;
