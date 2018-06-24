import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

/**
 * Select the current route's page components.
 * @returns {function} - Redux selector
 */
const getPageComponents = createSelector(
  [
    get('route.pathname'),
    get('components.page'),
  ],
  (pathname, pageMap) => pageMap[pathname] || [],
);

export default getPageComponents;
