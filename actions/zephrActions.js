/* eslint-disable import/prefer-default-export */
import { createAction } from '.';
import {
  RECEIVE_FORM_FOR_ROUTE,
} from './types';

/**
 * Create a Redux action that represents browser state change when a
 * authorization header is requested.
 *
 * @param {{components, route}} payload The form and its associated route.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveForm(payload) {
  return createAction(RECEIVE_FORM_FOR_ROUTE, { payload });
}
