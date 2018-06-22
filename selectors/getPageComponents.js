import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const getPageComponents = createSelector(
  [
    get('route.pathname'),
    get('components.page'),
  ],
  (pathname, pageMap) => pageMap[pathname] || [],
);

export default getPageComponents;
