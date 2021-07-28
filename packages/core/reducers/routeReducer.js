import {
  LOCATION_CHANGE,
  RECEIVE_COMPONENTS,
  RECEIVE_ERROR,
} from '../actions/types';
import { route as defaultState } from './defaultState';

/**
 * Handle Redux actions operating on the route state slice.
 *
 * @param {object} routeState Route state slice
 * @param {{type payload}} action Redux action
 * @returns {object} The updated route state
 */
export default function routeReducer(routeState = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_CHANGE:
      return {
        ...routeState,
        ...payload,
        apiValid: defaultState.apiValid,
        status: defaultState.status,
        redirectTo: defaultState.redirectTo,
        redirectStatus: defaultState.redirectStatus,
      };

    case RECEIVE_COMPONENTS:
      return {
        ...routeState,
        status: payload.status,
        redirectTo: payload.redirectTo || null,
        redirectStatus: payload.redirectStatus || null,
        apiValid: payload.apiValid,
      };

    case RECEIVE_ERROR:
      return {
        ...routeState,
        status: 500,
      };

    default:
      return routeState;
  }
}
