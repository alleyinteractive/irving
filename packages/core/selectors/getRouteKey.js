import { get, replace } from 'lodash/fp';
import { createSelector } from 'reselect';

/**
 * Select the current route's unique key.
 * @returns {function} - Redux selector
 */
const getRouteKey = createSelector(
  [
    get('route'),
  ],
  (routeState) => {
    const { redirectTo, pathname, search } = routeState;
    const key = redirectTo ||
      pathname + (search && 1 < search.length ? search : '');
    return replace(/\./g, '%2E', key);
  },
);

export default getRouteKey;
