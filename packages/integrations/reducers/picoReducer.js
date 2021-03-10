import { LOCATION_CHANGE } from '@irvingjs/core/actions/types';
import {
  PICO_LOADED,
  PICO_READY,
  PICO_CONTENT_READY,
  PICO_SCRIPT_ADDED,
  PICO_UPDATED,
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
    case PICO_LOADED:
      return {
        ...state,
        isLoaded: true,
      };

    case PICO_READY:
      return {
        ...state,
        isReady: true,
      };

    case PICO_CONTENT_READY:
      return {
        ...state,
        contentReady: true,
      };

    case PICO_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        contentReady: false,
        isUpdated: false,
      };

    case PICO_SCRIPT_ADDED:
      return {
        ...state,
        scriptAdded: true,
      };

    case UPDATE_PICO_PAGE_INFO:
      return {
        ...state,
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
