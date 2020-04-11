import { actionUpdateVisibility } from 'actions';
import { visible as defaultState } from './defaultState';
import reducer from './visibilityReducer';

describe('reducer', () => {
  it('should set field visible', () => {
    const mockState = { ...defaultState, foo: false };
    const newState = reducer(mockState, actionUpdateVisibility('foo', true));
    expect(newState.foo).toBe(true);
  });

  it('should set field not visible', () => {
    const mockState = { ...defaultState, foo: true };
    const newState = reducer(mockState, actionUpdateVisibility('foo', false));
    expect(newState.foo).toBe(false);
  });

  it('should toggle field visibility', () => {
    const mockState = { ...defaultState, foo: false };
    const newState = reducer(mockState, actionUpdateVisibility('foo'));
    expect(newState.foo).toBe(true);
  });
});
