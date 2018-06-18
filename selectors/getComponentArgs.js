import { CONTEXT_PAGE, CONTEXT_SITE } from 'config/constants';

/**
 * Select the args to fetch the current page's components.
 * @param {object} state - Redux state
 * @returns {{path: string, context: string}}
 */
export default function getComponentArgs(state) {
  return {
    path: state.route.location.path,
    context: state.siteComponents.length ? CONTEXT_PAGE : CONTEXT_SITE,
  };
}
