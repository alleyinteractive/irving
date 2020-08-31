import { createAction } from '@irvingjs/core/actions';
import {
  HYDRATE_COMPONENTS,
  SEND_PICO_VERIFICATION_REQUEST,
  RECEIVE_PICO_VERIFICATION_FAILURE,
  RECEIVE_CORAL_SSO_TOKEN,
  RECEIVE_CORAL_LOGOUT_REQUEST,
  RECEIVE_CORAL_LOGOUT,
  RECEIVE_CORAL_USERNAME_REQUEST,
  SET_CORAL_USERNAME,
  RECEIVE_CORAL_USERNAME_VALIDATION_ERROR,
  REQUIRE_UPGRADE_FOR_CORAL_SSO,
  RECEIVE_PICO_PLAN_UPGRADE,
} from './types';

/**
 * Create an action that updates the store with hydrated integration components.
 * @param {Object} componentMap - The hydrated components.
 * @returns {{type, payload}} The Redux action.
 */
export function actionHydrateComponents(componentMap) {
  return createAction(HYDRATE_COMPONENTS, componentMap);
}

/**
 * Create an action that dispatches an API request to verify a Pico user's validity.
 * @param {Object} user - The user's details.
 * @returns {{type, payload}} The Redux action.
 */
export function actionVerifyPicoUser(user) {
  return createAction(SEND_PICO_VERIFICATION_REQUEST, user);
}

/**
 * Create an action that is received when Pico cannot verify the user's validity.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceivePicoVerificationFailure() {
  return createAction(RECEIVE_PICO_VERIFICATION_FAILURE);
}

/**
 * Create an action that is dispatched when a Pico user upgrades their subscription tier.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceivePicoPlanUpgrade() {
  return createAction(RECEIVE_PICO_PLAN_UPGRADE);
}

/**
 * Create an action that is dispatched when a Pico user tries to authenticate a Coral
 * session but does not have the necessary subscription level.
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequireUpgrade() {
  return createAction(REQUIRE_UPGRADE_FOR_CORAL_SSO);
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
