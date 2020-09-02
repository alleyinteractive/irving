import { createAction } from '@irvingjs/core/actions';
import {
  RECEIVE_CORAL_LOGOUT_REQUEST,
  RECEIVE_CORAL_LOGOUT,
  RECEIVE_CORAL_SSO_TOKEN,
  RECEIVE_CORAL_USERNAME_REQUEST,
  RECEIVE_CORAL_USERNAME_VALIDATION_ERROR,
  SET_CORAL_USERNAME,
} from './types';

/**
 * Create an action that dispatches an action requesting that the validated Pico user
 * set a username before proceeding through the SSO workflow.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralUsernameRequest() {
  return createAction(RECEIVE_CORAL_USERNAME_REQUEST);
}

/**
 * Create an action that updates the store when a user has successfully set a
 * username for use in Coral.
 * @returns {{type, payload}} The Redux action.
 */
export function actionSetCoralUsername() {
  return createAction(SET_CORAL_USERNAME);
}

/**
 * Create an action that updates the store when a Coral username validation error
 * is received.
 * @param {Object} error - The validation error.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralUsernameValidationFailure(error) {
  return createAction(RECEIVE_CORAL_USERNAME_VALIDATION_ERROR, error);
}

/**
 * Create an action that updates the store when a Coral SSO token is recieved
 * from the API.
 * @param {Object} user - The user's details.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralToken(token) {
  return createAction(RECEIVE_CORAL_SSO_TOKEN, token);
}

/**
 * Create an action that updates the store when a Coral user requests to be
 * logged out via SSO through Pico.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralLogoutRequest() {
  return createAction(RECEIVE_CORAL_LOGOUT_REQUEST);
}

/**
 * Create an action that updates the store when a Coral user is successfully
 * logged out.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralLogout() {
  return createAction(RECEIVE_CORAL_LOGOUT);
}
