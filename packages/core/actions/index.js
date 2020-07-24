import {
  LOCATION_CHANGE,
  REQUEST_COMPONENTS_AUTHORIZED,
  RECEIVE_ERROR,
  RECEIVE_COMPONENTS,
  FINISH_LOADING,
  UPDATE_VISIBILITY,
} from './types';

/**
 * Create a Flux Standard Action
 * @param  {string} type Identifies the nature of the action
 * @param  {*} payload The information of the action
 * @returns {{type, payload}} Redux action
 */
export function createAction(type, payload = null) {
  return { type, payload };
}

/**
 * Create a Redux action that represents a browser state change.
 * @param {string} action The browser action (push, pop, replace, etc..)
 * @param {object} location The new location object
 * @returns {{type, payload}} Redux action
 */
export function actionLocationChange(action, location) {
  return createAction(LOCATION_CHANGE, { action, ...location });
}

/**
 * Create a Redux action that represents an authorized request for components
 * @returns {{type, payload}}
 */
export function actionRequestComponentsAuthorized() {
  return createAction(REQUEST_COMPONENTS_AUTHORIZED);
}

/**
 * Create a Redux action that represents the app receiving API components.
 * @param {object}   data
 * @param {object[]} data.defaults Default components
 * @param {object[]} data.page Page specific components
 * @param {object[]} data.providers Provider components
 * @param {boolean}  data.status Response was a 404
 * @param {string}   data.redirectTo The new url path the app should resolve
 * @returns {{type, payload}} Redux action
 */
export function actionReceiveComponents(data) {
  return createAction(RECEIVE_COMPONENTS, data);
}

/**
 * Create a Redux action the represents the app receiving an unrecoverable error.
 * @returns {{type, payload}} Redux action
 */
export function actionReceiveError(err) {
  return createAction(RECEIVE_ERROR, err);
}

/**
 * Create a Redux action that represents the global loading state becoming inactive.
 * @returns {{type, payload}}
 */
export function actionFinishLoading() {
  return createAction(FINISH_LOADING);
}

/**
 * Create a Redux action that represents a change in global UI visibility
 * @returns {{type, payload}} Redux action
 */
export function actionUpdateVisibility(name, isVisible = null) {
  return createAction(UPDATE_VISIBILITY, { name, isVisible });
}
