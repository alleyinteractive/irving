import {
  RECEIVE_USER_LOGIN,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_REGISTRATION,
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
    case RECEIVE_USER_LOGIN:
      return { ...state, ...payload.user };
    case RECEIVE_USER_LOGOUT:
      return state;
    case RECEIVE_USER_REGISTRATION:
      return {
        ...state,
        ...payload.user,
      };
    default:
      return state;
  }
}
