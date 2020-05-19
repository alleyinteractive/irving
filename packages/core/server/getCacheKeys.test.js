import waitForExpect from 'wait-for-expect';
import getCacheKeys from './getCacheKeys';

jest.mock('../services/cacheService');
require('../services/cacheService')();

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getCacheKeys', () => {
  it(
    'should get an array of all available cache keys',
    async () => {
      const req = {};
      const res = mockResponse();

      await getCacheKeys(req, res);

      await waitForExpect(() => {
        expect(res.json).toHaveBeenCalledWith(
          [
            'components-endpoint:path=/&context=site',
            'components-endpoint:path=/test-page&context=site',
            'components-endpoint:path=/test-page&context=site&extra-parameter=2',
            'components-endpoint:path=/test-page&context=site&extra-parameter=3',
            'components-endpoint:path=/test-article&context=site',
            'components-endpoint:path=/test-article/&context=site',
            'components-endpoint:path=/test-term&context=site',
            'components-endpoint:path=/test-term&context=site&another-param',
            'components-endpoint:path=/test-test-test',
          ]
        );
      });
    }
  );
});
