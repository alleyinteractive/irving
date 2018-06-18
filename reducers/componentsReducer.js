import { RECEIVE_COMPONENTS } from 'actions/types';

/**
 * Handle Redux actions operating on the components state slice.
 * @param {object} state - components state slice
 * @param {{type payload}} action - Redux action
 * @returns {object} - The updated components state
 */
export default function componentReducer(state, action) { // eslint-disable-line no-unused-vars
  const { type, payload } = action;
  if (RECEIVE_COMPONENTS !== type) {
    return state;
  }

  // update with payload
  const key = local

  return state;
}
