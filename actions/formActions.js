import omitBy from 'lodash/fp/omitBy';
import {
  REQUEST_SUBMIT,
  RECEIVE_SUBMITTED,
  RECEIVE_SUBMIT_ERROR,
  RECEIVE_SUBMIT_INVALID,
} from './types';
import { createAction } from '.';

/**
 * Create a request submit Redux action.
 * @param {string} formName
 * @param {object} submission
 * @returns {{type, payload}}
 */
export function actionRequestSubmit(formName, submission) {
  const omitEmpty = omitBy((value) => ! value);
  return createAction(REQUEST_SUBMIT, {
    formName,
    submission: omitEmpty(submission),
  });
}

export function actionReceiveSubmitted(formName, response) {
  return createAction(RECEIVE_SUBMITTED, { formName, response });
}

/**
 * Create a receive submit error Redux action.
 * @param {string} formName
 * @param {Error} err
 * @returns {{type, payload}}
 */
export function actionReceiveSubmitError(formName, err) {
  return createAction(RECEIVE_SUBMIT_ERROR, { formName, message: err.message });
}

/**
 * Create a action to receive validation messages.
 * @param {string} formName
 * @param {Object} messageMap
 * @returns {{type, payload}}
 */
export function actionReceiveSubmitInvalid(formName, messageMap) {
  return createAction(RECEIVE_SUBMIT_INVALID, { formName, messageMap });
}
