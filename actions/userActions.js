import { createAction } from '.';
import { INITIATE_USER_LOGIN, RECEIVE_USER_LOGIN } from './types';

/**
 * Create a Redux action that represents browser state change when user submits
 * email to login.
 *
 * @param {*} email The email of the user requesting a login.
 * @returns {{type, payload}} The Redux action.
 */
export function actionInitiateUserLogin(email) {
  return createAction(INITIATE_USER_LOGIN, { email });
}

/**
 * Create Redux action that represents browser state change when user submits password to login.
 *
 * @returns {{type, payload}} The redux action.
 */
export function actionReceiveUserLogin() {
  return createAction(RECEIVE_USER_LOGIN);
}
