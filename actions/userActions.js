import { createAction } from '.';
import {
  INITIATE_USER_LOGIN,
  RECEIVE_USER_LOGIN,
  RECEIVE_USER_LOGOUT,
  SUBMIT_USER_REGISTRATION,
  RECEIVE_USER_REGISTRATION,
  VERIFY_USER_EMAIL,
} from './types';

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
 * Create Redux action that represents browser state change when user is found.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserLogin(user) {
  return createAction(RECEIVE_USER_LOGIN, { user });
}

/**
 * Create a Redux action that represents browser state change when a user logs out.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserLogout() {
  return createAction(RECEIVE_USER_LOGOUT);
}

/**
 * Create a Redux action that represents browser state change when a user completes
 * the registration form.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionSubmitUserRegistration(body) {
  return createAction(SUBMIT_USER_REGISTRATION, { body });
}

/**
 * Create a Redux action that represents browser state change when a new user is
 * returned from the Nexus.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserRegistration(user) {
  return createAction(RECEIVE_USER_REGISTRATION, { user });
}

/**
 * Create a Redux action that represents browser state change when a user verifies
 * their email address.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionVerifyUserEmail(hash) {
  return createAction(VERIFY_USER_EMAIL, { hash });
}
