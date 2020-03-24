import errorReducer from './errorReducer';
import { LOCATION_CHANGE, RECEIVE_ERROR } from 'actions/types';
import { error as defaultState } from 'reducers/defaultState';

describe('errorReducer', () => {
  it('Should return the default state when the location changes', () => {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        endpoint: 'testEndpoint',
      },
    };
    expect(errorReducer(defaultState, action)).toEqual(defaultState);
  });

  it('Should return the payload when the app receives an unrecoverable error', () => {
    const action = {
      type: RECEIVE_ERROR,
      payload: {
        endpoint: 'testEndpoint',
      },
    };
    expect(errorReducer(defaultState, action)).toEqual(action.payload);
  });

  it('Should return the default state when there is no type', () => {
    const action = {
      payload: {
        endpoint: 'testEndpoint',
      },
    };
    expect(errorReducer(defaultState, action)).toEqual(defaultState);
  });

  it('Should return the default state when there is no payload', () => {
    const action = {
      type: LOCATION_CHANGE,
    };
    expect(errorReducer(defaultState, action)).toEqual(defaultState);
  });
});
