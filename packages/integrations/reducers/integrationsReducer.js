import merge from 'lodash/fp/merge';
import {
  HYDRATE_COMPONENTS,
  RECEIVE_CORAL_SSO_TOKEN,
  RECEIVE_CORAL_LOGOUT_REQUEST,
  RECEIVE_CORAL_LOGOUT,
  RECEIVE_CORAL_USERNAME_REQUEST,
  SET_CORAL_USERNAME,
  RECEIVE_CORAL_USERNAME_VALIDATION_ERROR,
  REQUIRE_UPGRADE_FOR_CORAL_SSO,
} from '../actions/types';
import defaultState from './defaultState';

/**
 * Handle Redux actions operating on the integrations state slice.
 * @param {object} integrationsState - Integrations state slice.
 * @param {{type payload}} action -  The Redux action.
 * @returns {object} The updated integrations state.
 */
export default function integrationsReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case HYDRATE_COMPONENTS:
      return merge(state, { componentMap: payload, hydrated: true });

    // TODO: Build out case for when user hase successfully upgraded to clear
    // this value from the store.
    case REQUIRE_UPGRADE_FOR_CORAL_SSO:
      return {
        ...state,
        coral: { requireUpgrade: true },
      };

    case RECEIVE_CORAL_USERNAME_REQUEST:
      return {
        ...state,
        coral: { requireUsername: true },
      };

    case SET_CORAL_USERNAME:
      return {
        ...state,
        coral: {},
      };

    case RECEIVE_CORAL_USERNAME_VALIDATION_ERROR:
      return {
        ...state,
        coral: { validationError: payload },
      };

    case RECEIVE_CORAL_SSO_TOKEN:
      return {
        ...state,
        coral: { token: payload },
      };

    case RECEIVE_CORAL_LOGOUT_REQUEST:
      return {
        ...state,
        coral: {
          token: null,
          purgeUser: true,
        },
      };

    case RECEIVE_CORAL_LOGOUT:
      return {
        ...state,
        coral: {},
      };

    default:
      return state;
  }
}
