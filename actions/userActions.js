// @todo this will be updated when the user state is more flushed out.
/* eslint-disable no-unused-vars */
import { createAction } from '.';
import {
  REQUEST_SEND_EMAIL,
  USER_EMAIL_SENT,
  USER_EMAIL_FAILED,
} from './types';

/**
 * Create a Redux action that represents a browser state change.
 *
 * @param {string} action   The browser action (push, pop, replace, etc..)
 * @param {string} payload  The email address of the form.
 *
 * @returns {{type, payload}} - Redux action
 */
export function actionRequestSendEmail(email) {
  return createAction(REQUEST_SEND_EMAIL, { email });
}

/**
 * Create a Redux action that represents a browser state change.
 *
 * @param {string} action   The browser action (push, pop, replace, etc..)
 * @param {string} payload  The email address of the form.
 *
 * @returns {{type, payload}} - Redux action
 */
export function actionUserEmailError(email, err) {
  return createAction(USER_EMAIL_FAILED);
}

export function actionUserEmailSent(email) {
  return createAction(USER_EMAIL_SENT);
}
