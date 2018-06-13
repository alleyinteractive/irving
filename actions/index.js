import { LOCATION_CHANGE } from './actionTypes';

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
