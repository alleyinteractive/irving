import { components as defaultState } from 'config/defaultState';

/**
 * Handle Redux actions operating on the components state slice.
 * @param {object[]} state - components state slice
 * @param {{type payload}} action - Redux action
 * @returns {object[]} - The updated components state
 */
export default function componentReducer(state = defaultState, action) { // eslint-disable-line no-unused-vars
  return state;
}
