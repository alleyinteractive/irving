import {
  LOCATION_CHANGE,
  RECEIVE_API_ERROR,
  RECEIVE_COMPONENTS,
} from './types';

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
 * Create a Redux action that represents the app receiving components.
 * @param {object}   data
 * @param {object[]} data.defaults - default components
 * @param {object[]} data.page - page specific components
 * @param {boolean}  data.notFound - response was a 404
 * @returns {{type, payload}} - Redux action
 */
export function actionReceiveComponents(data) {
  return createAction(RECEIVE_COMPONENTS, data);
}

/**
 * Create a Redux action the represents the app receiving an unrecoverable API error.
 * @returns {{type, payload}} - Redux action
 */
export function actionReceiveApiError() {
  return createAction(RECEIVE_API_ERROR);
}
