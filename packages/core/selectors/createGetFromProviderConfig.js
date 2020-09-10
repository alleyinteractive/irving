import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import createGetProviderConfig from './createGetProviderConfig';

/**
 * Create a selector that will return the value of a key
 * within the current config of a specific provider.
 *
 * @returns {function} - Redux selector
 */
const createGetFromProviderConfig = (providerName, key) => (
  createSelector(
    [
      (state) => createGetProviderConfig()(
        state,
        { name: providerName }
      ),
    ],
    (config) => (
      get(key, config) || null
    )
  )
);

export default createGetFromProviderConfig;
