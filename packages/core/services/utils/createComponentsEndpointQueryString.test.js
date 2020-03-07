import createComponentsEndpointQueryString from
  './createComponentsEndpointQueryString';

it('should build a correct query string', () => {
  const basicQueryString = createComponentsEndpointQueryString(
    '/basic-path'
  );
  const pathWithSearch = createComponentsEndpointQueryString(
    '/some-path',
    's=searchstring'
  );
  const pathWithCookie = createComponentsEndpointQueryString(
    '/some-path',
    '',
    {
      someCookieKey: 'someCookieValue',
    }
  );
  const pathWithContext = createComponentsEndpointQueryString(
    '/some-path',
    '',
    {},
    'site'
  );
  const pathWithEveryOption = createComponentsEndpointQueryString(
    '/some-path',
    's=searchstring',
    {
      aCookie: 99,
    },
    'site'
  );

  expect(basicQueryString).toBe(
    'path=/basic-path&context=page'
  );
  expect(pathWithSearch).toBe(
    'path=/some-path&context=page&s=searchstring'
  );
  expect(pathWithCookie).toBe(
    'path=/some-path&context=page&someCookieKey=someCookieValue'
  );
  expect(pathWithContext).toBe(
    'path=/some-path&context=site'
  );
  expect(pathWithEveryOption).toBe(
    'path=/some-path&context=site&s=searchstring&aCookie=99'
  );
});
