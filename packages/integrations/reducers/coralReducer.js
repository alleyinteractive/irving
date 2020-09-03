import {
  DISMISS_CORAL_UPGRADE_MODAL,
  RECEIVE_CORAL_LOGIN,
  RECEIVE_CORAL_LOGOUT_REQUEST,
  RECEIVE_CORAL_LOGOUT,
  RECEIVE_CORAL_SSO_TOKEN,
  RECEIVE_CORAL_USERNAME_REQUEST,
  RECEIVE_CORAL_USERNAME_SET_HASH,
  RECEIVE_CORAL_USERNAME_VALIDATION_ERROR,
  RECEIVE_PICO_PLAN_UPGRADE,
  REQUIRE_UPGRADE_FOR_CORAL_SSO,
  SEND_PICO_VERIFICATION_REQUEST,
  SET_CORAL_USERNAME,
  SUBMIT_CORAL_USERNAME,
} from '../actions/types';
import { coral as defaultState } from './defaultState';

/**
 * Handle Redux actions operating on the Coral state slice.
 * @param {object} coralState - Coral state slice.
 * @param {{type payload}} action -  The Redux action.
 * @returns {object} The updated Coral state.
 */
export default function coralReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case DISMISS_CORAL_UPGRADE_MODAL:
      return {
        ...state,
        showUpgradeModal: false,
        upgradeModalDismissed: true,
      };

    case REQUIRE_UPGRADE_FOR_CORAL_SSO:
      return {
        ...state,
        showUpgradeModal: true,
      };

    case RECEIVE_PICO_PLAN_UPGRADE:
      return {
        ...state,
        showUpgradeModal: false,
      };

    case RECEIVE_CORAL_USERNAME_REQUEST:
      return {
        ...state,
        requireUsername: true,
      };

    case RECEIVE_CORAL_USERNAME_SET_HASH:
      return {
        ...state,
        usernameSetHash: payload,
      };

    case SUBMIT_CORAL_USERNAME:
      return {
        ...state,
        validationError: null,
      };

    case SET_CORAL_USERNAME:
      return {
        ...state,
        usernameSetHash: null,
        validationError: null,
        requireUsername: false,
        usernameSet: true,
      };

    case RECEIVE_CORAL_USERNAME_VALIDATION_ERROR:
      return {
        ...state,
        validationError: payload,
      };

    case RECEIVE_CORAL_SSO_TOKEN:
      return {
        ...state,
        token: payload,
      };

    case RECEIVE_CORAL_LOGIN:
      return {
        ...state,
        loggedIn: true,
      };

    case RECEIVE_CORAL_LOGOUT_REQUEST:
      return {
        ...state,
        token: null,
        purgeUser: true,
        requireUsername: false,
        usernameSetHash: null,
      };

    case RECEIVE_CORAL_LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };

    case SEND_PICO_VERIFICATION_REQUEST:
      return {
        ...state,
        verificationRequestSent: true,
      };

    default:
      return state;
  }
}
