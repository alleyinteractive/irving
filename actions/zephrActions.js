import { createAction } from '.';
import {
  REQUEST_ZEPHR_FORMS,
  REQUEST_FORM_FOR_ROUTE,
  RECEIVE_FORM_FOR_ROUTE,
  SUBMIT_ZEPHR_FORM,
  RECEIVE_ZEPHR_USER_SESSION,
  RECEIVE_ZEPHR_USER_PROFILE,
  RECEIVE_LOGIN_ERROR,
  RECEIVE_USER_REGISTRATION,
  RECEIVE_USER_LOGIN,
  RECEIVE_PASSWORD_VERIFICATION_ERROR,
  RECEIVE_REGISTRATION_ERROR,
  CLEAR_FORM_ERRORS,
} from './types';

/**
 * A Redux action that represents browser state change when the forms are requested.
 *
 * @returns {{type}} The Redux action.
 */
export function actionRequestForms() {
  return createAction(REQUEST_ZEPHR_FORMS);
}

/**
 * A Redux action that represents browser state change when a form is requested from Zephr
 * by the form's slug (id).
 *
 * @param {{id}} The form's slug.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestForm(payload) {
  return createAction(REQUEST_FORM_FOR_ROUTE, payload);
}

/**
 * A Redux action that represents browser state change when a form is received from Zephr.
 *
 * @param {{components, route, onSubmit}} payload The form, its associated route and the submit function.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveForm(payload) {
  return createAction(RECEIVE_FORM_FOR_ROUTE, payload);
}

/**
 * A Redux action that represents browser state change when a form is submitted to Zephr.
 *
 * @param {{route, payload}} payload
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionSubmitForm(payload) {
  return createAction(SUBMIT_ZEPHR_FORM, payload);
}

/**
 * A Redux action that represents browser state change when user session data is received from Zephr.
 *
 * @param {{sessionCookie, trackindId, metaCookie}} payload User session data.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserSession(payload) {
  return createAction(RECEIVE_ZEPHR_USER_SESSION, payload);
}

/**
 * A Redux action that represents browser state change when a user profile is received from Zephr.
 *
 * @param {{emailAddress, firstName, lastName}} payload User profile.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserProfile(payload) {
  return createAction(RECEIVE_ZEPHR_USER_PROFILE, payload);
}

/**
 * A Redux action that represents browser state change when a user has successfully logged in.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveUserLogin() {
  return createAction(RECEIVE_USER_LOGIN);
}

/**
 * A Redux action that represents when a user submits incorrect information in the login form.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveLoginError(payload) {
  return createAction(RECEIVE_LOGIN_ERROR, payload);
}

/**
 * A Redux action that represents browser state change when a user successfully registers.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveUserRegistration() {
  return createAction(RECEIVE_USER_REGISTRATION);
}

/**
 * A Redux action that represents browser state change when a user attempts to register with a
 * password that does not match the verification prompt.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveInvalidPassword() {
  return createAction(RECEIVE_PASSWORD_VERIFICATION_ERROR);
}

/**
 * A Redux action that represents when a user submits invalid information in the registration form.
 *
 * @param {{errorType}} payload The error type to be returned.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveRegistrationError(payload) {
  return createAction(RECEIVE_REGISTRATION_ERROR, payload);
}

/**
 * A Redux action that represents when a user submits a form that contains errors. Those errors should
 * be cleared for the new submission.
 *
 * @param {{route}} paylod The form's route.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionClearFormErrors(payload) {
  return createAction(CLEAR_FORM_ERRORS, payload);
}
