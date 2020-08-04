import { HYDRATE_COMPONENTS } from '../actions/types';
import { integrationsState as defaultState } from './defaultState';

/**
 * Handle Redux actions operating on the integrations state slice.
 *
 * @param {object} integrationsState - Integrations state slice.
 * @param {{type payload}} action -  The Redux action.
 * @returns {object} The updated integrations state.
 */
export default function integrationsReducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case HYDRATE_COMPONENTS:
      return {
        ...state,
        componentMap: payload,
        hydrated: true,
      };
    default:
      return state;
  }
}
