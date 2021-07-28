import merge from 'lodash/fp/merge';
import { HYDRATE } from 'next-redux-wrapper';

/**
 * Handle component related Redux actions.
 *
 * @param {object} state Redux state
 * @param {{type payload}} action Redux action
 * @returns {object} The updated Redux state
 */
export default function componentReducer(state, action) {
  const { type, payload } = action;
  if (HYDRATE !== type) {
    return state;
  }

  return merge(state, payload);
}
