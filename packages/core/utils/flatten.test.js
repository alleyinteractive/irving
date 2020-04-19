import flatten from './flatten';

describe('flatten', () => {
  it('should flatten a nested object', () => {
    const nestedObj = {
      foo: {
        bar: 'foo',
      },
      bar: {
        baz: 'qux',
      },
    };

    expect(flatten(nestedObj)).toEqual({
      bar: 'foo',
      baz: 'qux',
    });
  });
});
