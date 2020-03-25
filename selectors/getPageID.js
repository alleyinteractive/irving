import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import getRouteKey from 'selectors/getRouteKey';

/**
 * Select the current route's page ID, or if none set, assigns the last queried
 * pageID to the current route.
 *
 * @returns {function} - Redux selector
 */
const getPageID = createSelector(
  [
    get('zephrRules.pageIDs'),
    getRouteKey,
    get('components.ID'),
  ],
  (pageIDs, routeKey, lastQueriedID) => {
    if (routeKey in pageIDs) {
      return pageIDs[routeKey];
    }

    return lastQueriedID;
  },
);

export default getPageID;
