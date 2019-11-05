import { createAction } from '.';
import {
  VERIFY_AUTH_TOKEN,
  SET_AUTH_HEADER,
  GET_AUTH_HEADER,
  INITIATE_USER_LOGIN,
  RECEIVE_USER_LOGIN,
} from './types';

/**
 * Create a Redux action that represents browser state change to verify that a
 * given authorization header is valid for 9 minutes.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionVerifyAuthToken() {
  return createAction(VERIFY_AUTH_TOKEN);
}

/**
 * Create a Redux action that represents browser state change when a valid
 * authorization header is set.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionSetAuthHeader() {
  return createAction(SET_AUTH_HEADER);
}

/**
 * Create a Redux action that represents browser state change when a user initiates a
 * request that requires an authorization token.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestAuthToken() {
  return createAction(GET_AUTH_HEADER);
}

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
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserLogin() {
  return createAction(RECEIVE_USER_LOGIN);
}
