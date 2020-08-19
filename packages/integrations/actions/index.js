import { createAction } from '@irvingjs/core/actions';
import {
  HYDRATE_COMPONENTS,
  PICO_VISIT,
} from './types';

/**
 * Create an action that updates the store with hydrated integration components.
 * @param {Object} componentMap - The hydrated components.
 * @returns {{type, payload}} The Redux action.
 */
export function actionHydrateComponents(componentMap) {
  return createAction(HYDRATE_COMPONENTS, componentMap);
}

/**
 * Create an action that triggers a pico visit.
 */
export function actionPicoVisit() {
  return createAction(PICO_VISIT);
}
