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
import defaultState from './defaultState';

/**
 * Create a state slice reducer for form related actions.
 * @param {string} name form state slice name
 * @return {function}
 */
const formReducer = (state = {}, action) => {
  const { type, payload } = action;
  const formName = get('formName', payload);

  if (! formName) {
    return defaultState;
  }

  const formState = get('formName', state) || defaultState;

  switch (type) {
    case REQUEST_SUBMIT: {
      return flow(
        set(`${formName}.validation`, {}),
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

export default formReducer;
