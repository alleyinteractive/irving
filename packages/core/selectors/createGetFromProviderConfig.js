import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import createGetProviderConfig from './createGetProviderConfig';

/**
 * Create a selector that will return the value of a key
 * within the current config of a specific provider.
 *
 * Useful if a provider exists in redux state only and components
 * down the tree want access to its data. Example:
 *
 * const getKeyIWant = createGetFromProviderConfig(
 *  'irving/test-provider',
 *  'key-i-want'
 * );
 * const providerData = useSelector(getKeyIWant);
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
