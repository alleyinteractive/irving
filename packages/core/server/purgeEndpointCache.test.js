import waitForExpect from 'wait-for-expect';
import purgeEndpointCache from './purgeEndpointCache';

jest.mock('../services/cacheService');
require('../services/cacheService')();

const mockRequest = (key) => ({
  originalUrl: key,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('purgeEndpointCache', () => {
  it(
    'should display "No cache to bust" if no matching keys are found',
    async () => {
      const req = mockRequest('/no-key-for-this');
      const res = mockResponse();

      await purgeEndpointCache(req, res);

      await waitForExpect(() => {
        expect(res.json).toHaveBeenCalledWith('No cache to bust.');
      });
    }
  );

  it(
    'should delete exact matches',
    async () => {
      const req = mockRequest('/');
      const res = mockResponse();

      await purgeEndpointCache(req, res);

      await waitForExpect(() => {
        expect(res.json)
          .toHaveBeenCalledWith('Endpoint cache deleted, matched 1 keys.');
      });
    }
  );

  it(
    'should delete any keys prefixed with the passed key',
    async () => {
      const req = mockRequest('/test-page');
      const res = mockResponse();

      await purgeEndpointCache(req, res);

      await waitForExpect(() => {
        expect(res.json)
          .toHaveBeenCalledWith('Endpoint cache deleted, matched 3 keys.');
      });
    }
  );
});
