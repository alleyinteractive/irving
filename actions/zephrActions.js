/* eslint-disable import/prefer-default-export */
import { createAction } from '.';
import {
  REQUEST_FORM_FOR_ROUTE,
  RECEIVE_FORM_FOR_ROUTE,
} from './types';

/**
 * A Redux action that represents browser state change when a form is requested from Zephr.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestForm() {
  return createAction(REQUEST_FORM_FOR_ROUTE);
}

/**
 * A Redux action that represents browser state change when a form is received from Zephr.
 *
 * @param {{components, route}} payload The form and its associated route.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveForm(payload) {
  return createAction(RECEIVE_FORM_FOR_ROUTE, { payload });
}
