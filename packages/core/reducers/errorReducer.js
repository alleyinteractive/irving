import { LOCATION_CHANGE, RECEIVE_ERROR } from 'actions/types';
import { error as defaultState } from 'reducers/defaultState';

/**
 * Handle Redux actions operating on the error state slice.
 *
 * @param {Error|null} errorState Error state slice
 * @param {{type payload}} action Redux action
 * @returns {Error|null} The updated error state
 */
export default function errorReducer(errorState = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOCATION_CHANGE:
      return defaultState;

    case RECEIVE_ERROR:
      return payload;

    default:
      return errorState;
  }
}
