import waitForExpect from 'wait-for-expect';
import bustPageCache from './bustPageCache';

// Set up the mocked cache service.
jest.mock(
  '../services/cacheService',
  // eslint-disable-next-line global-require
  () => require('../test/cacheService')
);

const mockRequest = (key) => ({
  query: {
    endpoint: key,
  },
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('bustPageCache', () => {
  it(
    'should display "No cache to bust" if no matching keys are found',
    async () => {
      const req = mockRequest('path=/no-key-for-this&context=site');
      const res = mockResponse();

      await bustPageCache(req, res);

      await waitForExpect(() => {
        expect(res.json).toHaveBeenCalledWith('No cache to bust.');
      });
    }
  );

  it(
    'should delete exact matches',
    async () => {
      const req = mockRequest('path=/&context=site');
      const res = mockResponse();

      await bustPageCache(req, res);

      await waitForExpect(() => {
        expect(res.json)
          .toHaveBeenCalledWith('Endpoint cache deleted, matched 1 keys.');
      });
    }
  );

  it(
    'should delete any keys prefixed with the passed key',
    async () => {
      const req = mockRequest('path=/test-page&context=site');
      const res = mockResponse();

      await bustPageCache(req, res);

      await waitForExpect(() => {
        expect(res.json)
          .toHaveBeenCalledWith('Endpoint cache deleted, matched 3 keys.');
      });
    }
  );
});
