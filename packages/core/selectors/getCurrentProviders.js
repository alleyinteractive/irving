import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import getRouteKey from './getRouteKey';

/**
 * Select providers and transform them into an array of current config values.
 *
 * @param {object} state Redux state
 * @return {function} Redux selector
 */
const getCurrentProviders = createSelector(
  [
    get('components.providers'),
    getRouteKey,
  ],
  (providers, routeKey) => (
    Object.keys(providers).map((name) => {
      const provider = providers[name];
      const current = provider[routeKey] ?
        provider[routeKey] : provider.current;

      return {
        name,
        ...current,
      };
    })
  )
);

export default getCurrentProviders;
