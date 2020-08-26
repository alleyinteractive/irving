import { createAction } from '@irvingjs/core/actions';
import {
  HYDRATE_COMPONENTS,
  SEND_PICO_VERIFICATION_REQUEST,
  RECEIVE_PICO_VERIFICATION_FAILURE,
  RECEIVE_CORAL_SSO_TOKEN,
  RECEIVE_CORAL_LOGOUT_REQUEST,
  RECEIVE_CORAL_LOGOUT,
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
