import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
// import getRouteKey from './getRouteKey';

/**
 * Select the current route's page ID.
 * @returns {function} - Redux selector
 */
const getPageID = createSelector(
  [
    get('components.page.ID'),
  ],
  (pageID) => ({
    pageID,
  })
);

export default getPageID;
