import {
  REQUEST_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA_ERROR,
} from 'actions/types';
import componentDataReducer from './componentDataReducer';

describe('componentDataReducer', () => {
  it('Should return default state if no payload', () => {
    expect(componentDataReducer({ foo: 'bar' }, {})).toEqual({ foo: 'bar' });
  });

  it('Should return default state if no type', () => {
    expect(componentDataReducer({ foo: 'bar' }, { payload: 'whatever' }))
      .toEqual({ foo: 'bar' });
  });

  it('Should add the initial request for REQUEST_COMPONENT_DATA', () => {
    const state = {};
    const action = {
      payload: {
        endpoint: 'testEndpoint',
      },
      type: REQUEST_COMPONENT_DATA,
    };
    expect(componentDataReducer(state, action)).toEqual({
      testEndpoint: {
        data: [],
        error: false,
        loaded: false,
        loading: true,
      },
    });
  });

  it('Should override the state with a new request for REQUEST_COMPONENT_DATA if the key exists',() => {
    const state = {
      testEndpoint: {
        data: [
          {
            foo: 'bar',
          },
        ],
        error: false,
        loaded: true,
        loading: false,
      },
    };
    const action = {
      payload: {
        endpoint: 'testEndpoint',
      },
      type: REQUEST_COMPONENT_DATA,
    };
    expect(componentDataReducer(state, action)).toEqual({
      testEndpoint: {
        data: [],
        error: false,
        loaded: false,
        loading: true,
      },
    });
  });

  it('Should not erase existing keys in state with a new request for REQUEST_COMPONENT_DATA', () => {
    const state = {
      testEndpoint: {
        data: [
          {
            foo: 'bar',
          },
        ],
        error: false,
        loaded: true,
        loading: false,
      },
    };
    const action = {
      payload: {
        endpoint: 'testEndpoint2',
      },
      type: REQUEST_COMPONENT_DATA,
    };
    expect(componentDataReducer(state, action)).toEqual({
      testEndpoint: {
        data: [
          {
            foo: 'bar',
          },
        ],
        error: false,
        loaded: true,
        loading: false,
      },
      testEndpoint2: {
        data: [],
        error: false,
        loaded: false,
        loading: true,
      },
    });
  });

  it('Should add the data to state when using RECEIVE_COMPONENT_DATA and data exists', () => {
    const state = {
      testEndpoint: {
        error: false,
        loaded: false,
        loading: true,
      },
    };
    const action = {
      payload: {
        endpoint: 'testEndpoint',
        data: [
          {
            foo: 'bar',
          },
        ],
      },
      type: RECEIVE_COMPONENT_DATA,
    };
    expect(componentDataReducer(state, action)).toEqual({
      testEndpoint: {
        data: [
          {
            foo: 'bar',
          },
        ],
        error: false,
        loaded: true,
        loading: false,
      },
    });
  });

  it('Should add error to state when there is an error in the payload', () => {
    const state = {
      testEndpoint: {
        error: false,
        loaded: false,
        loading: true,
      },
    };
    const error = new Error('foo');
    const action = {
      payload: {
        endpoint: 'testEndpoint',
        err: error,
      },
      type: RECEIVE_COMPONENT_DATA_ERROR,
    };
    expect(componentDataReducer(state, action)).toEqual({
      testEndpoint: {
        data: [],
        error,
        loaded: false,
        loading: false,
      },
    });
  });
});
