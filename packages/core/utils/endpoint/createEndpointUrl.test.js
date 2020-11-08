import createEndpointUrl from './createEndpointUrl';

describe('createEndpointUrl', () => {
  const hostname = 'multisite-one.irving.test';

  it('should build a simple endpoint string with only a path', () => {
    const simplePath = createEndpointUrl(
      hostname,
      '/basic-path'
    );
    expect(simplePath).toBe(
      'https://irving-multisite.test/api/components?path=/basic-path&context=page'
    );
  });

  it('should include a search string in the endpoint', () => {
    const pathWithSearch = createEndpointUrl(
      hostname,
      '/some-path',
      's=searchstring'
    );
    expect(pathWithSearch).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=page&s=searchstring'
    );
  });

  it('should include whitelisted cookies in the endpoint URL', () => {
    const pathWithCookie = createEndpointUrl(
      hostname,
      '/some-path',
      '',
      {
        someCookieKey: 'someCookieValue',
      }
    );
    expect(pathWithCookie).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=page&someCookieKey=someCookieValue'
    );
  });

  it('should modify context if provided', () => {
    const pathWithContext = createEndpointUrl(
      hostname,
      '/some-path',
      '',
      {},
      'site'
    );
    expect(pathWithContext).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=site'
    );
  });

  it('should apply all of the above consistently', () => {
    const pathWithEveryOption = createEndpointUrl(
      hostname,
      '/some-path',
      's=searchstring',
      {
        aCookie: 99,
      },
      'site'
    );
    expect(pathWithEveryOption).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=site&s=searchstring&aCookie=99'
    );
  });
});