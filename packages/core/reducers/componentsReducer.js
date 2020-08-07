import { flow, set } from 'lodash/fp';
import { RECEIVE_COMPONENTS } from 'actions/types';
import getRouteKey from 'selectors/getRouteKey';

/**
 * Handle component related Redux actions.
 *
 * @param {object} state Redux state
 * @param {{type payload}} action Redux action
 * @returns {object} The updated Redux state
 */
export default function componentReducer(state, action) {
  const { type, payload } = action;
  if (RECEIVE_COMPONENTS !== type) {
    return state;
  }

  const currentDefaults = state.components.defaults;
  const key = getRouteKey(state);
  const { defaults, providers, page } = payload;
  return flow(
    set('components.defaults', defaults.length ? defaults : currentDefaults),
    set(`components.providers.${key}`, providers),
    set(`components.page.${key}`, page)
  )(state);
}
