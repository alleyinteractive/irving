import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import { CONTEXT_PAGE, CONTEXT_SITE } from 'config/constants';
import getPageComponents from 'selectors/getPageComponents';

const getRouteMeta = createSelector(
  [
    get('route'),
    get('components'),
    getPageComponents,
  ],
  (route, components, pageComponents) => ({
    path: route.pathname,
    search: route.search,
    hash: route.hash,
    // Request the default site components if the Redux state doesn't have any yet.
    context: components.defaults.length ? CONTEXT_PAGE : CONTEXT_SITE,
    cached: !! pageComponents.length,
  })
);

export default getRouteMeta;
