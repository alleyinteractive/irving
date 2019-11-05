/* eslint-disable no-unused-vars */
import { user as defaultState } from './defaultState';

/**
 * State container reducer for user actions.
 * @param {object}   state   state container
 * @param {string}   type
 * @param {*}        payload
 * @returns {object}
 */
export default function userReducer(state = defaultState, { type, payload }) {
  switch (type) {
    // @todo This is just a stub, will be filled out when users states needed.
    //  Where the case is the actions in actions/types.js
    default:
      return state;
  }
}
