import { LOCATION_CHANGE } from 'actions/actionTypes';
import { route as defaultState } from 'config/defaultState';

/**
 * Handle Redux actions operating on the route state slice.
 * @param {object} state - route state slice
 * @param {{type payload}} action - Redux action
 * @returns {object} - The updated route state
 */
export default function componentReducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOCATION_CHANGE:
      return payload;

    default:
      return state;
  }
}
