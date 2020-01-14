import { GET_HEADER_HEIGHT } from 'actions/types';
import { headerHeight as defaultState } from 'reducers/defaultState';

/**
 * Handle Redux actions operating on the error state slice.
 * @param headerHeight - headerHeight state slice
 * @param {{type payload}} action - Redux action
 * @returns {payload|headerHeight} - The updated headerHeight state
 */
export default function getHeaderHeightReducer(
  headerHeightState = defaultState, action
) {
  const { type, payload } = action;
  switch (type) {
    case GET_HEADER_HEIGHT:
      return payload;

    default:
      return headerHeightState;
  }
}
