import { createAction } from '@irvingjs/core/actions';
import {
  PICO_LOADED,
  PICO_READY,
  PICO_CONTENT_READY,
  PICO_SCRIPT_ADDED,
  PICO_UPDATED,
  RECEIVE_PICO_PLAN_UPGRADE,
  RECEIVE_PICO_VERIFICATION_FAILURE,
  REQUIRE_UPGRADE_FOR_CORAL_SSO,
  SEND_PICO_VERIFICATION_REQUEST,
  UPDATE_PICO_PAGE_INFO,
  UPDATE_PICO_SIGNAL,
} from './types';

/**
 * Create an action that updates the store when Pico has initialized.
 * @returns {{type, payload}} The Redux action.
 */
export function actionPicoLoaded() {
  return createAction(PICO_LOADED);
}

/**
 * Create an action that updates the store when Pico is ready.
 * @returns {{type, payload}} The Redux action.
 */
export function actionPicoReady() {
  return createAction(PICO_READY);
}

/**
 * Create an action that updates the store when post content is ready to be blocked.
 * @returns {{type, payload}} The Redux action.
 */
export function actionPicoContentReady() {
  return createAction(PICO_CONTENT_READY);
}

/**
 * Create an action that updates the store when the Pico script is added.
 * @returns {{type, payload}} The Redux action.
 */
export function actionPicoScriptAdded() {
  return createAction(PICO_SCRIPT_ADDED);
}

/**
 * Create an action that updates the store to indicate pico has internally
 * updated itself with new page info.
 * @returns {{type, payload}} The Redux action.
 */
export function actionPicoUpdated() {
  return createAction(PICO_UPDATED);
}

/**
 * Create an action that updates the store with the current Pico page info.
 * @param {Object} pageInfo - The Pico page info.
 * @returns {{type, payload}} The Redux action.
 */
export function actionUpdatePicoPageInfo(pageInfo) {
  return createAction(UPDATE_PICO_PAGE_INFO, pageInfo);
}

/**
 * Create an action that updates the store with the Pico signal's data.
 * @param {object} signal - Pico signal object.
 * @returns {{type, payload}} The Redux action.
 */
export function actionUpdatePicoSignal(signal) {
  return createAction(UPDATE_PICO_SIGNAL, signal);
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
