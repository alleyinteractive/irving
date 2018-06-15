import {
  LOCATION_CHANGE, RECEIVE_API_ERROR,
  RECEIVE_COMPONENTS,
} from './actionTypes';

/**
 * Create a Flux Standard Action
 * @param  {string} type action type
 * @param  {object} data data to pass into state
 * @return {object} to be consumed by the reducer
 */
export default function createAction(type, data = null) {
  return { type, payload: data };
}

/**
 * Create a Redux action that represents a browser state change.
 * @param {string} action - the browser action (push, pop, replace, etc..)
 * @param {object} location - the new location object
 * @returns {{type, payload}} - Redux action
 */
export function actionLocationChange(action, location) {
  return createAction(LOCATION_CHANGE, { action, ...location });
}

/**
 * Create a Redux action
 * @param {object[]} components
 * @returns {{type, payload}} - Redux action
 */
export function actionReceiveComponents(components) {
  return createAction(RECEIVE_COMPONENTS, components);
}

/**
 * Create a Redux action the represents the app receiving an unrecoverable API error.
 * @returns {{type, payload}} - Redux action
 */
export function actionReceiveApiError() {
  return createAction(RECEIVE_API_ERROR);
}
