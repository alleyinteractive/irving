import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import merge from 'lodash/fp/merge';
import {
  REQUEST_SUBMIT,
  RECEIVE_SUBMITTED,
  RECEIVE_SUBMIT_ERROR,
  RECEIVE_SUBMIT_INVALID,
} from '../actions/types';
import { formState as defaultState } from './defaultState';

/**
 * Create a state slice reducer for form related actions.
 * @param {string} name form state slice name
 * @return {function}
 */
const formReducer = (state = {}, action) => {
  const { type, payload } = action;
  const formEndpoint = get('formEndpoint', payload);
  const formResponse = get('response', payload);

  if (!formEndpoint) {
    return state;
  }

  const formState = get(formEndpoint, state) || defaultState;
  let newFormState;

  switch (type) {
    case REQUEST_SUBMIT:
      newFormState = {
        validation: {},
        submitting: true,
        failed: false,
      };
      break;

    case RECEIVE_SUBMITTED:
      newFormState = {
        submitting: false,
        submitted: true,
        redirect: get('redirect', formResponse),
      };
      break;

    case RECEIVE_SUBMIT_ERROR:
      newFormState = {
        submitting: false,
        failed: true,
        error: get('error', formResponse),
      };
      break;

    case RECEIVE_SUBMIT_INVALID:
      newFormState = {
        submitting: false,
        validation: get('validation', formResponse),
      };
      break;

    default:
      newFormState = formState;
  }

  return set(
    formEndpoint,
    merge(formState, newFormState),
    state,
  );
};

export default formReducer;
