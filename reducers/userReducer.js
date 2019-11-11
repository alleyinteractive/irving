import {
  RECEIVE_USER_AUTH,
  RECEIVE_USER_LOGIN,
  RECEIVE_REQUEST_HEADER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_NEW_USER_EMAIL,
} from 'actions/types';
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
    case RECEIVE_REQUEST_HEADER:
      return { ...state, authorization: { ...payload.header } };
    case RECEIVE_USER_AUTH:
      return { ...state, authorization: { ...payload.auth } };
    case RECEIVE_USER_LOGIN:
      return { ...state, ...payload.user };
    case RECEIVE_USER_LOGOUT:
      return state;
    case RECEIVE_NEW_USER_EMAIL:
      return { ...state, email: payload.email };
    default:
      return state;
  }
}
