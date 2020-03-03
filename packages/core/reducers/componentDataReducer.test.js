import componentDataReducer from './componentDataReducer';

describe('componentDataReducer', () => {
  it('should return default state if no paylod', () => {
    expect(componentDataReducer({ foo: 'bar' }, {})).toEqual({ foo: 'bar' });
  });
});
