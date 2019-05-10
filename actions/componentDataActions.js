import {
  REQUEST_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA,
  RECEIVE_COMPONENT_ERROR,
} from 'actions/types';
import { createAction } from '.';

/**
 * Create a request component data Redux action.
 * @param {string} componentName
 * @returns {{type, payload}}
 */
export function actionRequestComponentData(componentName, endpoint) {
  return createAction(REQUEST_COMPONENT_DATA, { componentName, endpoint });
}

/**
 * Create a action to receive validation messages.
 * @param {string} componentName
 * @param {object} response
 * @returns {{type, payload}}
 */
export function actionReceiveComponentData(componentName, data) {
  return createAction(RECEIVE_COMPONENT_DATA, { componentName, data });
}

/**
 * Create a receive submit error Redux action.
 * @param {string} componentName
 * @param {Error} err
 * @returns {{type, payload}}
 */
export function actionReceiveComponentError(componentName) {
  return createAction(RECEIVE_COMPONENT_ERROR, { componentName });
}
