import createEndpointUrl from './createEndpointUrl';

describe('createEndpointUrl', () => {
  const hostname = 'multisite-one.irving.test';

  it('should build a simple endpoint string with only a path', () => {
    const simplePath = createEndpointUrl({
        hostname,
        path: '/basic-path',
        context: 'page',
      }, {});
    expect(simplePath).toBe(
      'https://irving-multisite.test/api/components?path=/basic-path&context=page'
    );
  });

  it('should include a search string in the endpoint', () => {
    const pathWithSearch = createEndpointUrl({
      hostname,
      path: '/some-path',
      search: 's=searchstring',
      context: 'page',
    }, {});
    expect(pathWithSearch).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=page&s=searchstring'
    );
  });

  it('should include whitelisted cookies in the endpoint URL', () => {
    const pathWithCookie = createEndpointUrl({
      hostname,
      path: '/some-path',
      search: '',
      context: 'page',
    }, {
      someCookieKey: 'someCookieValue',
    });
    expect(pathWithCookie).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=page&someCookieKey=someCookieValue'
    );
  });

  it('should modify context if provided', () => {
    const pathWithContext = createEndpointUrl({
      hostname,
      path: '/some-path',
      search: '',
      cookie: {},
      context: 'site',
    });
    expect(pathWithContext).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=site'
    );
  });

  it('should apply all of the above consistently', () => {
    const pathWithEveryOption = createEndpointUrl({
      hostname,
      path: '/some-path',
      search: 's=searchstring',
      cookie: {
        lorem: 'ipsum',
      },
      context: 'site',
    }, {
      anotherCookie: 99,
    });
    expect(pathWithEveryOption).toBe(
      'https://irving-multisite.test/api/components?path=/some-path&context=site&s=searchstring&anotherCookie=99'
    );
  });
});
