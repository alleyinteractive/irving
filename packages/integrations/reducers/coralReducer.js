import {
  RECEIVE_CORAL_SSO_TOKEN,
  RECEIVE_CORAL_LOGOUT_REQUEST,
  RECEIVE_CORAL_LOGOUT,
  RECEIVE_CORAL_USERNAME_REQUEST,
  SET_CORAL_USERNAME,
  RECEIVE_CORAL_USERNAME_VALIDATION_ERROR,
  REQUIRE_UPGRADE_FOR_CORAL_SSO,
  RECEIVE_PICO_PLAN_UPGRADE,
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
    case REQUIRE_UPGRADE_FOR_CORAL_SSO:
      return {
        ...state,
        requireUpgrade: true,
      };

    case RECEIVE_PICO_PLAN_UPGRADE:
      return {
        ...state,
        requireUpgrade: false,
      };

    case RECEIVE_CORAL_USERNAME_REQUEST:
      return {
        ...state,
        requireUsername: true,
      };

    case SET_CORAL_USERNAME:
      return {};

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

    case RECEIVE_CORAL_LOGOUT_REQUEST:
      return {
        ...state,
        token: null,
        purgeUser: true,
      };

    case RECEIVE_CORAL_LOGOUT:
      return {};

    default:
      return state;
  }
}
