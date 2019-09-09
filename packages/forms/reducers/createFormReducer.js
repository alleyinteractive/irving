import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import merge from 'lodash/fp/merge';
import {
  REQUEST_SUBMIT,
  RECEIVE_SUBMITTED,
  RECEIVE_SUBMIT_ERROR,
  RECEIVE_SUBMIT_INVALID,
} from '../actions/types';
import getDefaultState from './defaultState';

/**
 * Create a state slice reducer for form related actions.
 * @param {string} name form state slice name
 * @return {function}
 */
const createFormReducer = (name) => (
  formState = getDefaultState(),
  { type, payload }
) => {
  if (name !== get('formName', payload)) {
    return formState;
  }

  switch (type) {
    case REQUEST_SUBMIT: {
      return flow(
        set('validation', {}),
        merge({
          submitting: true,
          failed: false,
        })
      )(formState);
    }

    case RECEIVE_SUBMITTED:
      return merge(formState, {
        submitting: false,
        submitted: true,
        redirect: get('response.redirect', payload),
      });

    case RECEIVE_SUBMIT_ERROR:
      return merge(formState, {
        submitting: false,
        failed: true,
      });

    case RECEIVE_SUBMIT_INVALID:
      return flow(
        set('submitting', false),
        set('validation', payload.messageMap)
      )(formState);

    default:
      return formState;
  }
};

export default createFormReducer;
