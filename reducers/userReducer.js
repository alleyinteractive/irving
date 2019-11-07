import { RECEIVE_USER_AUTH, RECEIVE_USER_LOGIN } from 'actions/types';
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
    case RECEIVE_USER_LOGIN:
      return { ...state, ...payload.user };
    default:
      return state;
  }
}
