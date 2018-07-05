import { LOCATION_CHANGE, RECEIVE_COMPONENTS } from 'actions/types';
import { route as defaultState } from 'reducers/defaultState';

/**
 * Handle Redux actions operating on the route state slice.
 * @param {object} routeState - route state slice
 * @param {{type payload}} action - Redux action
 * @returns {object} - The updated route state
 */
export default function routeReducer(routeState = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOCATION_CHANGE:
      return {
        ...routeState,
        ...payload,
        status: defaultState.status,
        redirectTo: defaultState.redirectTo,
      };

    case RECEIVE_COMPONENTS:
      return {
        ...routeState,
        status: payload.status,
        redirectTo: payload.redirectTo,
      };

    default:
      return routeState;
  }
}
