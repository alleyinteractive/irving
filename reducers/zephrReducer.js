import {
  REQUEST_FORM_FOR_ROUTE,
  RECEIVE_FORM_FOR_ROUTE,
  RECEIVE_ZEPHR_USER_SESSION,
  RECEIVE_ZEPHR_USER_PROFILE,
  RECEIVE_LOGIN_ERROR,
  // REQUEST_ZEPHR_UI_COMPONENTS,
  RECEIVE_ZEPHR_UI_COMPONENTS,
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
    case RECEIVE_ZEPHR_USER_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case RECEIVE_LOGIN_ERROR:
      return {
        ...state,
        forms: [
          ...state.forms.map((form) => {
            if ('/login' === form.route) {
              return { ...form, error: true };
            }

            return form;
          }),
        ],
      };
    case RECEIVE_ZEPHR_UI_COMPONENTS:
      return {
        ...state,
        zephrComponents: payload,
      };
    default:
      return state;
  }
}
