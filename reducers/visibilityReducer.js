import { UPDATE_VISIBILITY } from 'actions/types';
import { visible as defaultState } from './defaultState';

/**
 * Handle Redux actions related to global UI element's visibility.
 *
 * @param {object} visibleState - visible state slice
 * @param {{type payload}} action - Redux action
 * @return {object}
 */
export default function visibilityReducer(visibleState = defaultState, action) {
  const { type, payload } = action;
  if (UPDATE_VISIBILITY !== type) {
    return visibleState;
  }

  const { name, isVisible } = payload;
  // Toggle value if it was omitted in action.
  const newValue = (null !== isVisible && 'undefined' !== typeof isVisible) ?
    isVisible :
    ! visibleState[name];

  return { ...visibleState, [name]: newValue };
}
