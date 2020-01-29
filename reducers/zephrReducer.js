import {
  REQUEST_FORM_FOR_ROUTE,
  RECEIVE_FORM_FOR_ROUTE,
  RECEIVE_ZEPHR_USER_SESSION,
} from 'actions/types';
import { zephr as defaultState } from './defaultState';

/**
 * State container reducer for Zephr actions.
 * @param {object}   state   state container
 * @param {string}   type
 * @param {*}        payload
 * @returns {object}
 */
export default function zephrReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case REQUEST_FORM_FOR_ROUTE:
      return { ...state, isLoading: true };
    case RECEIVE_FORM_FOR_ROUTE:
      return {
        ...state,
        isLoading: false,
        forms: [...state.forms, payload],
        cached: true,
      };
    case RECEIVE_ZEPHR_USER_SESSION:
      return {
        ...state,
        session: payload,
      };
    default:
      return state;
  }
}
