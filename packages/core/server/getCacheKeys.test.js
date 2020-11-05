import waitForExpect from 'wait-for-expect';
import getCacheKeys from './getCacheKeys';

jest.mock('ioredis');

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
            'components-endpoint:https://binbong.com/components?path=/&context=site',
            'components-endpoint:https://binbong.com/components?path=/test-page&context=site',
            'components-endpoint:https://binbong.com/components?path=/test-page&context=site&extra-parameter=2',
            'components-endpoint:https://binbong.com/components?path=/test-page&context=site&extra-parameter=3',
            'components-endpoint:https://binbong.com/components?path=/test-article&context=site',
            'components-endpoint:https://binbong.com/components?path=/test-article/&context=site',
            'components-endpoint:https://binbong.com/components?path=/test-term&context=site',
            'components-endpoint:https://binbong.com/components?path=/test-term&context=site&another-param',
            'components-endpoint:https://binbong.com/components?path=/test-test-test',
          ]
        );
      });
    }
  );
});
