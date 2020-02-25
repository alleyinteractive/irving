import fetchMock from 'fetch-mock';
import {
  createQueryString,
  fetchComponents,
} from './fetchComponents';

beforeEach(() => {
  process.env.API_ROOT_URL = 'https://foo.com/api';
  fetchMock.restore();
});

it('should build a correct query string', () => {
  const basicQueryString = createQueryString(
    '/basic-path'
  );
  const pathWithSearch = createQueryString(
    '/some-path',
    's=searchstring'
  );
  const pathWithCookie = createQueryString(
    '/some-path',
    '',
    {
      someCookieKey: 'someCookieValue',
    }
  );
  const pathWithContext = createQueryString(
    '/some-path',
    '',
    {},
    'site'
  );
  const pathWithEveryOption = createQueryString(
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

it('should append extra query params that are defined', async (done) => {
  process.env.API_QUERY_PARAM_BAR = 'baz';

  // Throws an error if the request doesn't match.
  fetchMock.get(
    'https://foo.com/api/components',
    {},
    {
      query: {
        path: '/foo',
        context: 'page',
        bar: 'baz',
      },
    }
  );

  await fetchComponents('/foo');

  done();
});

it('should pass query params from the request to the api', async (done) => {
  // Throws an error if the request doesn't match.
  fetchMock.get('https://foo.com/api/components', {}, {
    query: {
      path: '/foo',
      context: 'page',
      bar: 'baz',
    },
  });

  await fetchComponents('/foo', '?bar=baz');
  done();
});
