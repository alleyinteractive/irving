import { createAction } from '@irvingjs/core/actions';
import {
  HYDRATE_COMPONENTS,
  SEND_PICO_VERIFICATION_REQUEST,
  RECEIVE_CORAL_SSO_TOKEN,
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
 * Create an action that updates the store when a Coral SSO token is recieved
 * from the API.
 * @param {Object} user - The user's details.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveCoralToken(token) {
  return createAction(RECEIVE_CORAL_SSO_TOKEN, token);
}
