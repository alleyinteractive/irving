import {
  LOCATION_CHANGE,
  REQUEST_COMPONENTS_AUTHORIZED,
  RECEIVE_ERROR,
  RECEIVE_COMPONENTS,
  FINISH_LOADING,
  UPDATE_VISIBILITY,
  UPDATE_CONTENT_POSITION,
  UPDATE_HEADER_HEIGHT,
  DISMISS_NOTICE,
} from './types';

/**
 * Create a Flux Standard Action
 * @param  {string} type - identifies the nature of the action
 * @param  {*} payload - the information of the action
 * @returns {{type, payload}} - Redux action
 */
export function createAction(type, payload = null) {
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
 * Create a Redux action that represents an authorized request for components
 * @returns {{type, payload}}
 */
export function actionRequestComponentsAuthorized() {
  return createAction(REQUEST_COMPONENTS_AUTHORIZED);
}

/**
 * Create a Redux action that represents the app receiving API components.
 * @param {object}   data
 * @param {object[]} data.defaults - default components
 * @param {object[]} data.page - page specific components
 * @param {object[]} data.providers - provider components
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

/**
 * Create a Redux action that represents the global loading state becoming inactive.
 * @returns {{type, payload}}
 */
export function actionFinishLoading() {
  return createAction(FINISH_LOADING);
}

/**
 * Create a Redux action that represents a change in global UI visibility
 * @returns {{type, payload}} - Redux action
 */
export function actionUpdateVisibility(name, isVisible = null) {
  return createAction(UPDATE_VISIBILITY, { name, isVisible });
}

/**
 * Create a Redux action that represents a change in header height
 * @returns {{type, payload}} - Redux action
 */
export function actionUpdateHeaderHeight(headerHeight = 0) {
  return createAction(UPDATE_HEADER_HEIGHT, headerHeight);
}

/**
 * Create a Redux action that represents a change in story content height
 * @returns {{type, payload}} - Redux action
 */
export function actionUpdateContentPos(contentPos = { height: 0, top: 0 }) {
  return createAction(UPDATE_CONTENT_POSITION, contentPos);
}

export function actionDismissNotice() {
  return createAction(DISMISS_NOTICE);
}
