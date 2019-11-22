import { createAction } from '.';
import {
  SHOW_FULL_STORY,
  TRUNCATE_STORY,
} from './types';

/**
 * Create a Redux action that represents browser state change when a
 * story is truncated.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionTruncateStory() {
  return createAction(TRUNCATE_STORY);
}

/**
 * Create a Redux action that represents browser state change when a
 * story is truncated.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionShowFullStory() {
  return createAction(SHOW_FULL_STORY);
}
