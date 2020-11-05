import createEndpointUrl from './createEndpointUrl';

describe('createEndpointUrl', () => {
  process.env.API_ROOT_URL = 'https://binbong.com';

  it('should build a simple endpoint string with only a path', () => {
    const simplePath = createEndpointUrl(
      '/basic-path'
    );
    expect(simplePath).toBe(
      'https://binbong.com/components?path=/basic-path&context=page'
    );
  });

  it('should include a search string in the endpoint', () => {
    const pathWithSearch = createEndpointUrl(
      '/some-path',
      's=searchstring'
    );
    expect(pathWithSearch).toBe(
      'https://binbong.com/components?path=/some-path&context=page&s=searchstring'
    );
  });

  it('should include whitelisted cookies in the endpoint URL', () => {
    const pathWithCookie = createEndpointUrl(
      '/some-path',
      '',
      {
        someCookieKey: 'someCookieValue',
      }
    );
    expect(pathWithCookie).toBe(
      'https://binbong.com/components?path=/some-path&context=page&someCookieKey=someCookieValue'
    );
  });

  it('should modify context if provided', () => {
    const pathWithContext = createEndpointUrl(
      '/some-path',
      '',
      {},
      'site'
    );
    expect(pathWithContext).toBe(
      'https://binbong.com/components?path=/some-path&context=site'
    );
  });

  it('should apply all of the above consistently', () => {
    const pathWithEveryOption = createEndpointUrl(
      '/some-path',
      's=searchstring',
      {
        aCookie: 99,
      },
      'site'
    );
    expect(pathWithEveryOption).toBe(
      'https://binbong.com/components?path=/some-path&context=site&s=searchstring&aCookie=99'
    );
  });
});
