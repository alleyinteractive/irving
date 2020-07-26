import {
  LOCATION_CHANGE,
  REQUEST_COMPONENTS_AUTHORIZED,
  RECEIVE_COMPONENTS,
  RECEIVE_ERROR,
  FINISH_LOADING,
} from 'actions/types';
import { error as defaultState } from 'reducers/defaultState';

/**
 * Handle Redux actions operating on the loading state slice.
 *
 * @param {bool} loadingState Loading state slice
 * @param {{type payload}} action Redux action
 * @returns {object} The updated loading state
 */
export default function loadingReducer(loadingState = defaultState, action) {
  const { type } = action;
  switch (type) {
    case LOCATION_CHANGE:
    case REQUEST_COMPONENTS_AUTHORIZED:
      return true;

    case FINISH_LOADING:
    case RECEIVE_COMPONENTS:
    case RECEIVE_ERROR:
      return false;

    default:
      return loadingState;
  }
}
