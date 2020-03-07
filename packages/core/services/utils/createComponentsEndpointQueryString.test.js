import createComponentsEndpointQueryString from
  './createComponentsEndpointQueryString';

it('should build a correct query string', () => {
  const simplePath = createComponentsEndpointQueryString(
    '/basic-path'
  );
  expect(simplePath).toBe(
    'path=/basic-path&context=page'
  );

  const pathWithSearch = createComponentsEndpointQueryString(
    '/some-path',
    's=searchstring'
  );
  expect(pathWithSearch).toBe(
    'path=/some-path&context=page&s=searchstring'
  );

  const pathWithCookie = createComponentsEndpointQueryString(
    '/some-path',
    '',
    {
      someCookieKey: 'someCookieValue',
    }
  );
  expect(pathWithCookie).toBe(
    'path=/some-path&context=page&someCookieKey=someCookieValue'
  );

  const pathWithContext = createComponentsEndpointQueryString(
    '/some-path',
    '',
    {},
    'site'
  );
  expect(pathWithContext).toBe(
    'path=/some-path&context=site'
  );

  const pathWithEveryOption = createComponentsEndpointQueryString(
    '/some-path',
    's=searchstring',
    {
      aCookie: 99,
    },
    'site'
  );
  expect(pathWithEveryOption).toBe(
    'path=/some-path&context=site&s=searchstring&aCookie=99'
  );
});
