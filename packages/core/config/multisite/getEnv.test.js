import getEnv from './getEnv';

describe('getEnv', () => {
  it('merge site-specific keys into process.env and return the resulting object', () => {
    const mergedEnv = getEnv('multisite-one.irving.test');
    expect(mergedEnv).toMatchObject({
      API_ROOT_URL: 'https://irving-multisite.test/api',
      ROOT_URL: 'https://multisite-one.irving.test',
      BASIC_AUTH_USERNAME: 'alley',
      BASIC_AUTH_PASSWORD: 'interactive',
      BASIC_AUTH: true,
    });
  });

  it('should be backwards compatible with `vars` key', () => {
    const mergedEnv = getEnv('multisite-three.irving.test');
    expect(mergedEnv).toMatchObject({
      API_ROOT_URL: 'https://irving-multisite-three.test/api',
      ROOT_URL: 'https://multisite-three.irving.test',
    });
  });
});
