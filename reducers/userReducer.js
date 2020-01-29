import { zephr as defaultState } from './defaultState';

/**
 * State container reducer for user actions.
 * @param {object}   state   state container
 * @param {string}   type
 * @param {*}        payload
 * @returns {object}
 */
export default function userReducer(
  state = defaultState.user,
  { type, payload }, // eslint-disable-line no-unused-vars
) {
  switch (type) {
    default:
      return state;
  }
}
