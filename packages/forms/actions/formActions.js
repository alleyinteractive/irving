import omitBy from 'lodash/fp/omitBy';
import { createAction } from '@irvingjs/core/actions';
import {
  REQUEST_SUBMIT,
  RECEIVE_SUBMITTED,
  RECEIVE_SUBMIT_ERROR,
  RECEIVE_SUBMIT_INVALID,
} from './types';

/**
 * Create a request submit Redux action.
 * @param {string} formEndpoint
 * @param {object} submission
 * @returns {{type, payload}}
 */
export function actionRequestSubmit(formEndpoint, submission) {
  const omitEmpty = omitBy((value) => !value);
  return createAction(REQUEST_SUBMIT, {
    formEndpoint,
    submission: omitEmpty(submission),
  });
}

export function actionReceiveSubmitted(formEndpoint, response) {
  return createAction(RECEIVE_SUBMITTED, { formEndpoint, response });
}

/**
 * Create a receive submit error Redux action.
 * @param {string} formEndpoint
 * @param {Error} err
 * @returns {{type, payload}}
 */
export function actionReceiveSubmitError(formEndpoint, err) {
  return createAction(
    RECEIVE_SUBMIT_ERROR,
    { formEndpoint, error: err.message },
  );
}

/**
 * Create a action to receive validation messages.
 * @param {string} formEndpoint
 * @param {Object} validation
 * @returns {{type, payload}}
 */
export function actionReceiveSubmitInvalid(formEndpoint, validation) {
  return createAction(RECEIVE_SUBMIT_INVALID, { formEndpoint, validation });
}
