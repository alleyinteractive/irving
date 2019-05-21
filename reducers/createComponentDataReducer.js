import get from 'lodash/fp/get';
import merge from 'lodash/fp/merge';
import {
  REQUEST_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA,
  RECEIVE_COMPONENT_ERROR,
} from 'actions/types';
import { componentData as defaultState } from './defaultState';

/**
 * Create a state slice reducer for components that need to asyncronously retrieve
 * additional data.
 *
 * @param {string} name component state slice name
 * @return {function}
 */
const createComponentDataReducer = (componentName) => (
  state = defaultState,
  { type, payload }
) => {
  if (componentName !== get('componentName', payload)) {
    return state;
  }

  switch (type) {
    case REQUEST_COMPONENT_DATA: {
      return merge(state, {
        loading: true,
      });
    }

    case RECEIVE_COMPONENT_DATA:
      return merge(state, {
        loading: false,
        data: payload.data,
      });

    case RECEIVE_COMPONENT_ERROR:
      return merge(state, {
        loading: false,
        error: true,
      });

    default:
      return state;
  }
};

export default createComponentDataReducer;
