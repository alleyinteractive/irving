import { createAction } from '.';
import { REQUEST_SEND_EMAIL, USER_EMAIL_SENT } from './types';

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
  console.error(email, err); // eslint-disable-line no-console
  // look at form response.
  // return createAction(SEND_USER_EMAIL);
}

export function actionUserEmailSent(email) {
  console.log(email); // eslint-disable-line no-console
  return createAction(USER_EMAIL_SENT);
}
