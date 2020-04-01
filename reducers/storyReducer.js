import {
  SHOW_FULL_STORY,
  TRUNCATE_STORY,
} from 'actions/types';
import { story as defaultState } from './defaultState';

/**
 * State container reducer for story actions.
 * @param {object}   state   state container
 * @param {string}   type
 * @param {*}        payload
 * @returns {object}
 */ // eslint-disable-next-line no-unused-vars
export default function userReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SHOW_FULL_STORY:
      return { ...state, showFullStory: true };
    case TRUNCATE_STORY:
      return { ...state, showFullStory: false };
    default:
      return state;
  }
}
