import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import getRouteKey from './getRouteKey';

/**
 * Select the current route's page components.
 * @returns {function} - Redux selector
 */
const getProviders = createSelector(
  [
    getRouteKey,
    get('components.providers'),
  ],
  (routeKey, providersMap) => providersMap[routeKey] || []
);

export default getProviders;
