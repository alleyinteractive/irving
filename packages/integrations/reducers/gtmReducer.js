import { SET_CONTAINER_ID } from '../actions/types';
import { gtm as defaultState } from './defaultState';

/**
 * Handle Redux actions operating on the integrations state slice.
 * @param {object} integrationsState - Integrations state slice.
 * @param {{type payload}} action -  The Redux action.
 * @returns {object} The updated integrations state.
 */
export default function gtmReducer(
  state = defaultState,
  { type, payload },
) {
  switch (type) {
    case SET_CONTAINER_ID:
      return { ...state, gtmContainerId: payload };

    default:
      return state;
  }
}
