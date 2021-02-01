import { getSiteConfig } from './getSiteConfig';

describe('getSiteConfig', () => {
  it('should retrieve the entire configuration for site matching the current request hostname', () => {
    const config = getSiteConfig('multisite-two.irving.test');
    expect(config).toEqual({
      domain: 'multisite-two.irving.test',
      env: {
        API_ROOT_URL: 'https://irving-multisite-two.test/api',
        ROOT_URL: 'https://multisite-two.irving.test',
      },
    });
  });
});
