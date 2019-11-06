import { RECEIVE_USER_AUTH } from 'actions/types';
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
    case RECEIVE_USER_AUTH:
      return { ...state, authorization: { ...payload.auth } };
    default:
      return state;
  }
}
