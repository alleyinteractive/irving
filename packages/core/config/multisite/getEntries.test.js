import getEntries from './getEntries';

describe('getEntries', () => {
  it('should add all entries configured in multisite.config.js to webpack build', () => {
    const entries = getEntries();
    expect(entries).toEqual({
      'multisite-one': './assets/sass/custom-styles.scss',
      'multisite-three': './assets/sass/multisite-three.scss',
    });
  });
});
