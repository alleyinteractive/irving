import { createAction } from '.';
import {
  REQUEST_AUTH,
  RECEIVE_USER_AUTH,
  INITIATE_USER_LOGIN,
  RECEIVE_USER_LOGIN,
  RECEIVE_REQUEST_HEADER,
} from './types';

/**
 * Create a Redux action that represents browser state change when a
 * authorization header is requested.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestAuth() {
  return createAction(REQUEST_AUTH);
}

/**
 * Create a Redux action that represents browser state change when a
 * authorization information is received.
 *
 * @param {object} auth Authorization values retrieved from the Irving API.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserAuth(auth) {
  return createAction(RECEIVE_USER_AUTH, { auth });
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
export function actionReceiveUserLogin(user) {
  return createAction(RECEIVE_USER_LOGIN, { user });
}

/**
 * Create a Redux action that represent browser state change when an Authoriztion header is
 * received from WordPress.
 *
 * @param {{type, payload}} header The Redux action.
 */
export function actionReceiveRequestHeader(header) {
  return createAction(RECEIVE_REQUEST_HEADER, { header });
}
