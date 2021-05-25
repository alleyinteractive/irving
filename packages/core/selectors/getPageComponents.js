import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import getRouteKey from './getRouteKey';

/**
 * Select the current route's page components.
 * @returns {function} - Redux selector
 */
const getPageComponents = createSelector(
  [
    getRouteKey,
    get('components.page'),
  ],
  (routeKey, pageMap) => pageMap[routeKey] || [],
);

export default getPageComponents;
