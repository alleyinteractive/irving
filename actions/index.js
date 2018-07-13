import {
  LOCATION_CHANGE,
  RECEIVE_ERROR,
  RECEIVE_COMPONENTS,
} from './types';

/**
 * Create a Flux Standard Action
 * @param  {string} type - identifies the nature of the action
 * @param  {*} payload - the information of the action
 * @returns {{type, payload}} - Redux action
 */
function createAction(type, payload = null) {
  return { type, payload };
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
 * Create a Redux action that represents the app receiving API components.
 * @param {object}   data
 * @param {object[]} data.defaults - default components
 * @param {object[]} data.page - page specific components
 * @param {boolean}  data.status - response was a 404
 * @param {string}   data.redirectTo - the new url path the app should resolve
 * @returns {{type, payload}} - Redux action
 */
export function actionReceiveComponents(data) {
  return createAction(RECEIVE_COMPONENTS, data);
}

/**
 * Create a Redux action the represents the app receiving an unrecoverable error.
 * @returns {{type, payload}} - Redux action
 */
export function actionReceiveError(err) {
  return createAction(RECEIVE_ERROR, err);
}
