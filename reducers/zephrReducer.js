import {
  RECEIVE_FORM_FOR_ROUTE,
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
    case RECEIVE_FORM_FOR_ROUTE:
      // const { components, route } = payload; // eslint-disable-line no-case-declarations
      return { ...state, forms: [...state.forms, payload.payload] };
    default:
      return state;
  }
}
