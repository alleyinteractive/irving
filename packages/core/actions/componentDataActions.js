import {
  REQUEST_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA_ERROR,
  RESET_COMPONENT_DEFAULTS,
} from 'actions/types';
import { createAction } from 'actions';

/**
 * Create a request component data Redux action.
 * @param {string} endpoint
 * @returns {{type, payload}}
 */
export function actionRequestComponentData(endpoint) {
  return createAction(REQUEST_COMPONENT_DATA, { endpoint });
}

/**
 * Create a action to receive validation messages.
 * @param {string} endpoint external endpoint
 * @param {object} data external API response
 * @returns {{type, payload}}
 */
export function actionReceiveComponentData(endpoint, data) {
  return createAction(RECEIVE_COMPONENT_DATA, { endpoint, data });
}

/**
 * Create a receive submit error Redux action.
 * @param {string} endpoint
 * @param {Error} err
 * @returns {{type, payload}}
 */
export function actionReceiveComponentDataError(endpoint, err) {
  return createAction(RECEIVE_COMPONENT_DATA_ERROR, { endpoint, err });
}

/**
 * Create a reset default components Redux action.
 * @returns {{type, payload}}
 */
export function actionResetDefaultComponents() {
  return createAction(RESET_COMPONENT_DEFAULTS);
}
