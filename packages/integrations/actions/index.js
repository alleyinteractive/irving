import { createAction } from '@irvingjs/core/actions';
import { HYDRATE_COMPONENTS } from './types';

/**
 * Create an action that updates the store with hydrated integration components.
 * @param {Object} componentMap - The hydrated components.
 * @returns {{type, payload}} The Redux action.
 */
/* eslint-disable-next-line import/prefer-default-export */
export function actionHydrateComponents(componentMap) {
  return createAction(HYDRATE_COMPONENTS, componentMap);
}
