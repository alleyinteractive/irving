import { actionUpdateVisibility } from 'actions';
import { visible as defaultState } from './defaultState';
import reducer from './visibilityReducer';

it('should set field visible', () => {
  const mockState = { ...defaultState, foo: false };
  const newState = reducer(mockState, actionUpdateVisibility('foo', true));
  expect(newState.foo).toBe(true);
});

it('should set field no visible', () => {
  const mockState = { ...defaultState, foo: true };
  const newState = reducer(mockState, actionUpdateVisibility('foo', false));
  expect(newState.foo).toBe(false);
});

it('should toggle field visibility', () => {
  const mockState = { ...defaultState, foo: false };
  const newState = reducer(mockState, actionUpdateVisibility('foo'));
  expect(newState.foo).toBe(true);
});
