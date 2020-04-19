import { LOCATION_CHANGE, RECEIVE_ERROR } from 'actions/types';
import { error as errorState } from 'reducers/defaultState';
import errorReducer from './errorReducer';

describe('errorReducer', () => {
  it('Should return the errorState state when the location changes', () => {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        endpoint: 'testEndpoint',
      },
    };
    expect(errorReducer(errorState, action)).toEqual(errorState);
  });

  it('Should return the payload when the app receives an unrecoverable error',
    () => {
      const action = {
        type: RECEIVE_ERROR,
        payload: {
          endpoint: 'test error endpoint',
        },
      };
      expect(errorReducer(errorState, action)).toEqual(action.payload);
    });

  it('Should return errorState when there is no type', () => {
    const action = {
      payload: {
        endpoint: 'testEndpoint',
      },
    };
    expect(errorReducer(errorState, action)).toEqual(errorState);
  });

  it('Should return errorState when there is no payload', () => {
    const action = {
      type: LOCATION_CHANGE,
    };
    expect(errorReducer(errorState, action)).toEqual(errorState);
  });
});
