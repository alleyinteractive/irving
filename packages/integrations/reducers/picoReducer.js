import { LOCATION_CHANGE } from '@irvingjs/core/actions/types';
import {
  PICO_CONTENT_READY,
  UPDATE_PICO_LIFECYCLE,
  UPDATE_PICO_PAGE_INFO,
  UPDATE_PICO_SIGNAL,
} from '../actions/types';
import { pico as defaultState } from './defaultState';

/**
 * Handle Redux actions operating on the Pico state slice.
 * @param {object} picoState - Pico state slice.
 * @param {{type payload}} action -  The Redux action.
 * @returns {object} The updated Pico state.
 */
export default function picoReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case UPDATE_PICO_LIFECYCLE:
      return {
        ...state,
        lifecycle: {
          ...state.lifecycle,
          ...payload,
        },
      };

    case PICO_CONTENT_READY:
      return {
        ...state,
        contentReady: true,
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        contentReady: false,
        visited: false,
      };

    case UPDATE_PICO_PAGE_INFO:
      return {
        ...state,
        visited: true,
        pageInfo: payload,
      };

    case UPDATE_PICO_SIGNAL:
      return {
        ...state,
        signal: payload,
      };

    default:
      return state;
  }
}
