import { flow, set } from 'lodash/fp';
import { RECEIVE_COMPONENTS } from 'actions/types';
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

  const currentDefaults = state.components.default;
  const { path } = getRouteComponentOptions(state);
  const { notFound, defaults, page } = payload;
  return flow(
    set('route.notFound', notFound),
    set('components.site', defaults.length ? defaults : currentDefaults),
    set(`components.page.${path}`, page),
  )(state);
}
