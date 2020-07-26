import set from 'lodash/fp/set';
import createComponentDataKey from 'utils/createComponentDataKey';
import {
  REQUEST_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA_ERROR,
} from 'actions/types';
import {
  componentData,
  componentDataMeta,
} from './defaultState';

/**
 * Create a state slice reducer for components that need to asyncronously retrieve additional data.
 *
 * @param {string} name Component state slice name
 * @return {function}
 */
const componentDataReducer = (state = componentData, action) => {
  const { type, payload } = action;

  if (! payload) {
    return state;
  }

  const { endpoint } = payload;
  const key = createComponentDataKey(endpoint);

  switch (type) {
    case REQUEST_COMPONENT_DATA:
      return set(key, {
        ...componentDataMeta,
        loading: true,
        loaded: false,
      }, state);

    case RECEIVE_COMPONENT_DATA: {
      const { data } = payload;

      return set(key, {
        ...componentDataMeta,
        loading: false,
        loaded: true,
        data,
      }, state);
    }

    case RECEIVE_COMPONENT_DATA_ERROR: {
      const { err } = payload;

      return set(key, {
        ...componentDataMeta,
        loading: false,
        loaded: false,
        error: err,
      }, state);
    }

    default:
      return state;
  }
};

export default componentDataReducer;
