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
  (route, components, pageComponents) => {
    let context;

    // Allow `context` to be set with the route state, or if not
    // specified, request the default site components if the Redux state
    // doesn't have any yet.
    if (route.state && route.state.context) {
      context = route.state.context;
    } else {
      context = components.defaults.length ? CONTEXT_PAGE : CONTEXT_SITE;
    }

    return {
      path: route.pathname,
      search: route.search,
      hash: route.hash,
      cookie: route.cookie,
      context,
      cached: !! pageComponents.length,
    };
  }
);

export default getRouteMeta;
