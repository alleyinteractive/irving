import { flow, set } from 'lodash/fp';
import {
  RECEIVE_COMPONENTS,
  LOCATION_CHANGE,
} from 'actions/types';
import getRouteKey from 'selectors/getRouteKey';

/**
 * Handle component related Redux actions.
 * @param {object} state - Redux state
 * @param {{type payload}} action - Redux action
 * @returns {object} - The updated Redux state
 */
export default function componentReducer(state, action) {
  const { type, payload } = action;
  if (LOCATION_CHANGE === type) {
    return {
      ...state,
      components: {
        ...state.components,
        ID: false,
      },
    };
  }

  if (RECEIVE_COMPONENTS === type) {
    const currentDefaults = state.components.defaults;
    const key = getRouteKey(state);
    const {
      defaults, providers, page, ID = false,
    } = payload;
    return flow(
      set('components.defaults', defaults.length ? defaults : currentDefaults),
      set(`components.providers.${key}`, providers),
      set(`components.page.${key}`, page),
      set('components.ID', ID),
    )(state);
  }

  return state;
}
