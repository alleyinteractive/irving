import { RECEIVE_COMPONENTS } from 'actions/types';
import { CONTEXT_SITE } from 'config/constants';
import getRouteComponentOptions from 'selectors/getRouteComponentOptions';

/**
 * Handle component related Redux actions.
 * @param {object} state - Redux state
 * @param {{type payload}} action - Redux action
 * @returns {object} - The updated Redux state
 */
export default function componentReducer(state, action) { // eslint-disable-line no-unused-vars
  const { type, payload } = action;
  if (RECEIVE_COMPONENTS !== type) {
    return state;
  }

  const { path, context } = getRouteComponentOptions(state);
  // merge site and page specific components
  if (CONTEXT_SITE === context) {
    return {
      ...state,
      components: {
        ...state.components,
        site: payload.filter((component) => 'page' !== component.name),
        [path]: payload.page.children,
      },
    };
  }

  // merge only page specific components
  return {
    ...state,
    components: {
      ...state.components,
      [path]: payload.page.children,
    },
  };
}
