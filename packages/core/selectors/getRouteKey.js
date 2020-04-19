import { get, replace } from 'lodash/fp';
import { createSelector } from 'reselect';
import queryString from 'query-string';
import getCookies from 'selectors/getCookies';

/**
 * Select the current route's unique key.
 * @returns {function} - Redux selector
 */
const getRouteKey = createSelector(
  [
    get('route'),
    getCookies,
  ],
  (routeState, cookies) => {
    const { redirectTo, pathname, search } = routeState;
    const searchObj = queryString.parse(search);
    const queries = queryString.stringify({
      ...searchObj,
      ...cookies,
    });

    const key = redirectTo || `${pathname}${(queries ? `?${queries}` : '')}`;

    return replace(/\./g, '%2E', key);
  }
);

export default getRouteKey;
