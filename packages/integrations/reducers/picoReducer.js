import {
  PICO_LOADED,
  UPDATE_PICO_PAGE_INFO,
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
        loaded: true,
      };

    case UPDATE_PICO_PAGE_INFO:
      return {
        ...state,
        pageInfo: payload,
      };

    default:
      return state;
  }
}
