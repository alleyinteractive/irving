import waitForExpect from 'wait-for-expect';
import purgeCache from './purgeCache';

jest.mock('../services/cacheService');
require('../services/cacheService')();

const mockRequest = (keys) => ({
  body: {
    urls: keys,
  },
});

const mockResponse = () => {
  const res = {};

  res.body = '';
  res.write = jest.fn().mockImplementation((string) => {
    res.body += `${string}`;
  });
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res.body);

  return res;
};

describe('purgeCache', () => {
  it(
    'should display "No cache to bust" if no matching keys are found',
    async () => {
      const req = mockRequest(['/no-key-for-this']);
      const res = mockResponse();

      await purgeCache(req, res);

      await waitForExpect(() => {
        expect(res.body)
          .toBe('Cache purge successful: No keys matched for key components-endpoint:path=/no-key-for-this*');
      });
    }
  );

  it(
    'should only delete the root if a "/" url is provided',
    async () => {
      const req = mockRequest(['/']);
      const res = mockResponse();

      await purgeCache(req, res);

      await waitForExpect(() => {
        expect(res.body)
          .toBe('Cache purge successful: matched 1 keys for key components-endpoint:path=/&context=site');
      });
    }
  );

  it(
    'should delete any keys prefixed with or exactly matching the passed url',
    async () => {
      const req = mockRequest(['/test-page']);
      const res = mockResponse();

      await purgeCache(req, res);

      await waitForExpect(() => {
        expect(res.body)
          .toBe('Cache purge successful: matched 3 keys for key components-endpoint:path=/test-page*');
      });
    }
  );

  it(
    'should delete mutliple keys for a passed array of URLs',
    async () => {
      const req = mockRequest(['/test-article', '/test-term']);
      const res = mockResponse();

      await purgeCache(req, res);

      await waitForExpect(() => {
        expect(res.body)
          .toBe('Cache purge successful: matched 2 keys for key components-endpoint:path=/test-article*matched 2 keys for key components-endpoint:path=/test-term*');
      });
    }
  );

  it(
    'should purge entire cache if no URLs provided',
    async () => {
      const req = mockRequest();
      const res = mockResponse();

      await purgeCache(req, res);

      await waitForExpect(() => {
        expect(res.send)
          .toHaveBeenCalledWith('Cache purge successful: matched 1 keys');
      });
    }
  );
});
