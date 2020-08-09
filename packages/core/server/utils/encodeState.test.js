import encodeState from './encodeState';

describe('encodeState', () => {
  it('should omit a configured field from state', () => {
    const state = encodeState({
      test: {
        nested: {
          state: 'lorem ipsum',
        },
      },
    });
    expect(JSON.parse(state).test.nested).toEqual({});
  });

  it('encode unsafe HTMl characters', () => {
    const state = encodeState({
      unsafe: '<script>alert("lorem ipsum");</script>',
    });
    expect(JSON.parse(state).unsafe)
      .toEqual('\u003cscript>alert("lorem ipsum");\u003c/script>');
  });
});
