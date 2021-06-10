import { createAction } from '@irvingjs/core/actions';
import {
  SET_CONTAINER_ID,
} from './types';

export function actionSetContainerId(id) {
  return createAction(SET_CONTAINER_ID, id);
}
