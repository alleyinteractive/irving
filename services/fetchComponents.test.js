import fetchMock from 'fetch-mock';
import fetchComponents from './fetchComponents';

it('should append extra query params that are defined', async (done) => {
  process.env.API_ROOT_URL = 'https://foo.com/api';
  process.env.API_QUERY_PARAM_BAR = 'baz';

  // Throws an error if the request doesn't match.
  fetchMock.get('https://foo.com/api/components', {}, {
    query: {
      path: '/foo',
      context: 'page',
      bar: 'baz',
    },
  });

  await fetchComponents('/foo');
  done();
});
