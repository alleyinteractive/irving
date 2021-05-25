import mapValues from 'lodash/fp/mapValues';
import {
  UPDATE_VISIBILITY,
  LOCATION_CHANGE,
} from 'actions/types';
import { visible as defaultState } from './defaultState';

/**
 * Handle Redux actions related to global UI element visibility.
 *
 * @param {object} visibleState Visible state slice
 * @param {{type payload}} action Redux action
 * @return {object}
 */
export default function visibilityReducer(visibleState = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_CHANGE: {
      // Close everything when location changes
      return mapValues(() => false, visibleState);
    }

    case UPDATE_VISIBILITY: {
      const { name, isVisible } = payload;
      // Toggle value if it was omitted in action.
      const newValue = (isVisible !== null && typeof isVisible !== 'undefined')
        ? isVisible
        : !visibleState[name];

      return { ...visibleState, [name]: newValue };
    }

    default:
      return visibleState;
  }
}
