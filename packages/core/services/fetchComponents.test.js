import fetchMock from 'fetch-mock';
import fetchComponents from './fetchComponents';

beforeEach(() => {
  process.env.API_ROOT_URL = 'https://foo.com/api';
  fetchMock.restore();
});

it(
  'should append extra query params that are defined',
  async (done) => {
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

    const result = await fetchComponents('/foo');

    expect(result).toBeDefined();

    done();
  }
);

it(
  'should pass query params from the request to the api',
  async (done) => {
    // Throws an error if the request doesn't match.
    fetchMock.get('https://foo.com/api/components', {}, {
      query: {
        path: '/foo',
        context: 'page',
        bar: 'baz',
      },
    });

    const result = await fetchComponents('/foo', '?bar=baz');

    expect(result).toBeDefined();

    done();
  }
);
