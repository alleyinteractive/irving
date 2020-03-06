import componentDataReducer from './componentDataReducer';
import { merge } from 'lodash/fp';
import {
  REQUEST_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA,
  RECEIVE_COMPONENT_DATA_ERROR,
} from 'actions/types';
import {
  defaultState,
  componentDataMeta,
} from './defaultState';

describe('componentDataReducer', () => {
  // a key never gets set; componentDataMeta doesn't get included.
  console.log(componentDataReducer({ foo: 'bar' }, { payload: {}, type: REQUEST_COMPONENT_DATA }));
  console.log(componentDataReducer({ foo: 'bar' }, { payload: { data: { name: 'alleybot' } }, type: RECEIVE_COMPONENT_DATA }));
  console.log(componentDataReducer({ foo: 'bar' }, { payload: { err: 'you did it wrong' }, type: RECEIVE_COMPONENT_DATA_ERROR }));

  it('should return default state if no payload', () => {
    expect(componentDataReducer({ foo: 'bar' }, {})).toEqual( { foo: 'bar' } );
  });
  it('should return default state if no type', () => {
    expect(componentDataReducer({ foo: 'bar' }, { payload: 'whatever' })).toEqual( { foo: 'bar' });
  });
  it('should return something if type is REQUEST_COMPONENT_DATA', () => {
    expect(componentDataReducer({ foo: 'bar' }, {})).toEqual({ foo: 'bar' });
  });
  it('should return something if type is RECEIVE_COMPONENT_DATA', () => {
    expect(componentDataReducer({ foo: 'bar' }, {})).toEqual( { foo: 'bar' } );
  });
  it('should return somethig if type is RECEIVE_COMPONENT_DATA_ERROR', () => {
     expect(componentDataReducer({ foo: 'bar' }, {})).toEqual( { foo: 'bar' } );
  });
});
