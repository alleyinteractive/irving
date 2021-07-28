import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import { CONTEXT_PAGE, CONTEXT_SITE } from '../config/constants';
import getPageComponents from './getPageComponents';
import getCookies from './getCookies';

const getRouteMeta = createSelector(
  [
    get('route'),
    get('components'),
    getCookies,
    getPageComponents,
  ],
  (route, components, cookies, pageComponents) => {
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
      hostname: route.hostname,
      path: route.pathname,
      search: route.search,
      hash: route.hash || (
        window.location ? window.location.hash : ''
      ),
      cookie: cookies,
      context,
      cached: !!pageComponents.length,
    };
  },
);

export default getRouteMeta;
