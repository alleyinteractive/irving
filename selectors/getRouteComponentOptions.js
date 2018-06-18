import { CONTEXT_PAGE, CONTEXT_SITE } from 'config/constants';

/**
 * Select the options for the current Route's components.
 * @param {object} state - Redux state
 * @returns {{path: string, context: string}}
 */
export default function getRouteComponentOptions(state) {
  return {
    path: state.route.pathname,
    context: state.components.site.length ? CONTEXT_PAGE : CONTEXT_SITE,
  };
}
