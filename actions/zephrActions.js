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
  REQUEST_USER_LOG_OUT,
  RECEIVE_USER_LOG_OUT,
  RECEIVE_ZEPHR_USER_ACCOUNT,
  REQUEST_ZEPHR_UI_COMPONENTS,
  RECEIVE_ZEPHR_UI_COMPONENTS,
  VERIFY_ZEPHR_USER_TOKEN,
  RECEIVE_ZEPHR_USER_VERIFICATION,
  SEND_ZEPHR_VERIFICATION_EMAIL,
  REQUEST_UPDATE_EMAIL,
  REQUEST_EMAIL_CONFIRMATION,
  REQUEST_EMAIL_CONFIRMATION_ERROR,
  REQUEST_EMAIL_CONFIRMATION_SUCCESS,
  RECEIVE_UPDATE_EMAIL,
  RECEIVE_EMAIL_UPDATE_ERROR,
  REQUEST_EMAIL_UPDATE_ERROR,
  RECEIVE_UPDATE_EMAIL_SUCCESS,
  RECEIVE_RESET_PASSWORD_ERROR,
  RECEIVE_SSO_SESSION,
  SUBMIT_PROFILE,
  REQUEST_ZEPHR_DATA_LAYER,
  RECEIVE_ZEPHR_DATA_LAYER,
  RECEIVE_USER_VERIFICATION_ERROR,
  REQUEST_VERIFICATION_EMAIL,
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
 * A Redux action that represents when an error occurred receiving the token to update an email.
 *
 * @param {{type}} The Redux action.
 */
export function actionReceiveEmailUpdateError(payload) {
  return createAction(RECEIVE_EMAIL_UPDATE_ERROR, payload);
}

/**
 * A Redux action that represents when an error occurred the user made a request to change an email.
 *
 * @param {{type}} The Redux action.
 */
export function actionRequestEmailUpdateError(payload) {
  return createAction(REQUEST_EMAIL_UPDATE_ERROR, payload);
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
 * @param {{formType}} payload The type of form being submitted.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveInvalidPassword(payload) {
  return createAction(RECEIVE_PASSWORD_VERIFICATION_ERROR, payload);
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
 * A Redux action that represents when a user wants to edit their email.
 *
 * @param {{errorType}} payload The email to be sent
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestUpdateEmail(payload) {
  return createAction(REQUEST_UPDATE_EMAIL, payload);
}

/**
 * A Redux action that represents when a user wants to edit their email.
 *
 * @param {{errorType}} payload The email to be sent
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionCheckNewEmailUpdate(payload) {
  return createAction(REQUEST_EMAIL_CONFIRMATION, payload);
}

/**
 * A Redux action that represents when a user request the email confirmation to be sent to new email
 * but an error is returned.
 *
 * @param {{errorType}} type The redux action type.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestEmailConfirmationError(payload) {
  return createAction(REQUEST_EMAIL_CONFIRMATION_ERROR, payload);
}

/**
 * A Redux action that represents when a user request the email confirmation to be sent to new email
 * and a success is returned.
 *
 * @param {{successType}} type The redux action type.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestEmailConfirmationSuccess(payload) {
  return createAction(REQUEST_EMAIL_CONFIRMATION_SUCCESS, payload);
}

/**
 * A Redux action that represents when a user wants to edit their email.
 *
 * @param {{errorType}} payload The email to be sent
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionVerifyEmailUpdateToken(payload) {
  return createAction(RECEIVE_UPDATE_EMAIL, payload);
}

/**
 * A Redux action that represents when a user successfully updates their email.
 *
 * @param {{type}} payload The redux type.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveEmailUpdateSuccess(payload) {
  return createAction(RECEIVE_UPDATE_EMAIL_SUCCESS, payload);
}

/**
 * A Redux action that represents when a user submits a form that contains errors. Those errors should
 * be cleared for the new submission.
 *
 * @param {{route}} payload The form's route.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionClearFormErrors(payload) {
  return createAction(CLEAR_FORM_ERRORS, payload);
}

/**
 * A Redux action that represents when a user requests to be logged out of the application.
 *
 * @returns {{type}} The Redux action.
 */
export function actionRequestUserLogOut() {
  return createAction(REQUEST_USER_LOG_OUT);
}

/**
 * A Redux action that represents browser state change when a user is successfully logged out.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveUserLogOut() {
  return createAction(RECEIVE_USER_LOG_OUT);
}

/**
 * A Redux action that represents browser state change when a user's account information is
 * received from Zephr.
 *
 * @param {{ emailAddress }} The user's account.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserAccount(payload) {
  return createAction(RECEIVE_ZEPHR_USER_ACCOUNT, payload);
}

/**
 * A Redux action after the UI Components have been requested.
 *
 * @returns {{type}} The Redux action.
 */
export function actionRequestUIComponents() {
  return createAction(REQUEST_ZEPHR_UI_COMPONENTS);
}

/**
 * A Redux action after the UI Components have been received.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveUIComponents(payload) {
  return createAction(RECEIVE_ZEPHR_UI_COMPONENTS, payload);
}

/**
 * A Redux action that represents browser state change once the token exchange is initiated.
 *
 * @returns {{type}} The Redux action.
 */
export function actionSendUserVerificationEmail() {
  return createAction(SEND_ZEPHR_VERIFICATION_EMAIL);
}

/**
 * A Redux action that represents browser state change once a user's token is
 * submitted for verification.
 *
 * @param {{ token }} The user's verification token.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionVerifyToken(payload) {
  return createAction(VERIFY_ZEPHR_USER_TOKEN, payload);
}

/**
 * A Redux action that represents browser state change once a user is verified.
 *
 * @returns {{type}} The Redux action.
 */
export function actionReceiveUserVerification() {
  return createAction(RECEIVE_ZEPHR_USER_VERIFICATION);
}

/**
 * A Redux action that represents browser state change when a user enters a
 * password that does not meet the requirements when resetting their password.
 *
 * @param {{type}} The error type.
 *
 * @returns {{type, payload}} The Redux acion.
 */
export function actionReceiveResetError(payload) {
  return createAction(RECEIVE_RESET_PASSWORD_ERROR, payload);
}

/**
 * A Redux action that represents browser state change once a user logs in
 * using a third-party single sign-on (SSO) service.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveSsoSession(payload) {
  return createAction(RECEIVE_SSO_SESSION, payload);
}

/**
 * A Redux action that represents browser state change once a user requests a
 * change to their profile.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionSubmitProfile(payload) {
  return createAction(SUBMIT_PROFILE, payload);
}

/**
 * A Redux action that represents when a request has been made to update the
 * dataLayer for Google Tag Manager.
 */
export function actionRequestZephrDataLayer() {
  return createAction(REQUEST_ZEPHR_DATA_LAYER);
}

/**
 * A Redux action that represents when the Zephr API has returned information
 * about the dataLayer for Google Tag Manager.
 *
 * @param {type, payload} payload The redux action.
 */
export function actionReceiveZephrDataLayer(payload) {
  return createAction(RECEIVE_ZEPHR_DATA_LAYER, payload);
}

/**
 * A Redux action that represents when a user attempts to verify their email
 * address after the link has expired.
 */
export function actionReceiveUserVerificationError() {
  return createAction(RECEIVE_USER_VERIFICATION_ERROR);
}

/**
 * A Redux action that represents when a user manually requests a verification
 * email be sent to their inbox.
 *
 * @param {type, payload} payload The Redux action.
 */
export function actionRequestVerificationEmail(payload) {
  return createAction(REQUEST_VERIFICATION_EMAIL, payload);
}
