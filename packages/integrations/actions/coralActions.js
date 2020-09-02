import { createAction } from '@irvingjs/core/actions';
import {
  RECEIVE_CORAL_LOGOUT_REQUEST,
  RECEIVE_CORAL_LOGOUT,
  RECEIVE_CORAL_SSO_TOKEN,
  RECEIVE_CORAL_USERNAME_REQUEST,
  RECEIVE_CORAL_USERNAME_SET_HASH,
  RECEIVE_CORAL_USERNAME_VALIDATION_ERROR,
  SET_CORAL_USERNAME,
  SUBMIT_CORAL_USERNAME,
  DISMISS_CORAL_UPGRADE_MODAL,
} from './types';

/**
 * Create an action that updates the store when the Coral SSO upgrade modal is dismissed.
 * @returns {{type, payload}} The Redux action.
 */
export function actionDismissCoralUpgradeModal() {
  return createAction(DISMISS_CORAL_UPGRADE_MODAL);
}

/**
 * Create an action that dispatches an action requesting that the validated Pico user
 * set a username before proceeding through the SSO workflow.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralUsernameRequest() {
  return createAction(RECEIVE_CORAL_USERNAME_REQUEST);
}

/**
 * Create an action that stores the current user's set hash to validate their username
 * with the back-end setting endpoint.
 * @param {string} hash - md5 hash.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralUsernameSetHash(hash) {
  return createAction(RECEIVE_CORAL_USERNAME_SET_HASH, hash);
}

/**
 * Create an action that dispatches a username request to the Coral saga.
 *
 * @param {string} payload - The submitted username.
 * @returns {{type, payload}} The Redux action.
 */
export function actionSubmitCoralUsername(payload) {
  return createAction(SUBMIT_CORAL_USERNAME, payload);
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
