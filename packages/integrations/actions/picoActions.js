import { createAction } from '@irvingjs/core/actions';
import {
  PICO_LOADED,
  RECEIVE_PICO_PLAN_UPGRADE,
  RECEIVE_PICO_VERIFICATION_FAILURE,
  REQUIRE_UPGRADE_FOR_CORAL_SSO,
  SEND_PICO_VERIFICATION_REQUEST,
  UPDATE_PICO_PAGE_INFO,
  UPDATE_PICO_SIGNAL,
} from './types';

/**
 * Create an action that updates the store when Pico has loaded.
 * @returns {{type, payload}} The Redux action.
 */
export function actionPicoLoaded() {
  return createAction(PICO_LOADED);
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
 * Create an action that updates the store with a pico signal value.
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
