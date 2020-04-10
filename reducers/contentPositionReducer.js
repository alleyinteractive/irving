import { UPDATE_CONTENT_POSITION } from 'actions/types';
import { contentPos as defaultState } from 'reducers/defaultState';

/**
 * Handle Redux actions operating on the content height state slice.
 * @param contentPos - contentPos state slice
 * @param {{type payload}} action - Redux action
 * @returns {payload|contentPos} - The updated contentPos state
 */
export default function updateContentPositionReducer(
  contentPosState = defaultState, action
) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CONTENT_POSITION:
      return payload;

    default:
      return contentPosState;
  }
}
