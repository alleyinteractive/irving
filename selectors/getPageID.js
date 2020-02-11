import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

/**
 * Select the current route's page ID.
 * @returns {function} - Redux selector
 */
const getPageID = createSelector(
  [
    get('components.ID'),
  ],
  (pageID) => ({
    pageID,
  })
);

export default getPageID;
