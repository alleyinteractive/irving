import createComponentDataKey from './createComponentDataKey';

describe('createComponentDataKey', () => {
  it('should replace periods', () => {
    expect(createComponentDataKey('fo.o')).toEqual('fo%2Eo');
    expect(createComponentDataKey('.foo')).toEqual('%2Efoo');
    expect(createComponentDataKey('foo.')).toEqual('foo%2E');
    expect(createComponentDataKey('f.o.o.')).toEqual('f%2Eo%2Eo%2E');
    expect(createComponentDataKey('.')).toEqual('%2E');
  });

  it('should return as is', () => {
    expect(createComponentDataKey('foo')).toEqual('foo');
    expect(createComponentDataKey('f1f2')).toEqual('f1f2');
    expect(createComponentDataKey('f#23')).toEqual('f#23');
    expect(createComponentDataKey('1foo')).toEqual('1foo');
  });

  it('should return a string', () => {
    expect(createComponentDataKey(1234)).toEqual('1234');
    expect(createComponentDataKey(12.34)).toEqual('12%2E34');
    expect(createComponentDataKey(true)).toEqual('true');
    expect(createComponentDataKey(false)).toEqual('false');
  });

  it('should return an empty string', () => {
    expect(createComponentDataKey(undefined)).toEqual('');
    expect(createComponentDataKey(null)).toEqual('');
  });
});
