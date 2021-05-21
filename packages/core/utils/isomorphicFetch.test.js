import isomorphicFetch from './isomorphicFetch';
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = require('node-fetch');

beforeEach(() => {
  fetchMock.restore();
});

describe('isomorphicFetch', () => {
  it(
    'should fetch data from a provided URL',
    async (done) => {
      fetchMock.get('https://irvingjs.com/api', {
        data: 'some very important information',
      });
      const result = await isomorphicFetch('https://irvingjs.com/api');
      const content = await result.json();

      expect(content).toBeDefined();
      expect(content).toEqual({
        data: 'some very important information',
      });

      done();
    }
  );

  it(
    'should add a default https protocol if no protocol is present.',
    async (done) => {
      fetchMock.get('https://irvingjs.com/api', {
        data: 'some very important information',
      });
      const result = await isomorphicFetch('//irvingjs.com/api');
      const content = await result.json();

      expect(content).toEqual({
        data: 'some very important information',
      });

      done();
    }
  );

  it(
    'should encode the fetch URI',
    async (done) => {
      fetchMock.get('https://irvingjs.com/api?path=%20/%E2%80%93dsj34%5D%5B&s=blue', {
        data: 'some very important information',
      });
      const result = await isomorphicFetch(
        '//irvingjs.com/api?path= /–dsj34][&s=blue'
      );
      const content = await result.json();

      expect(content).toEqual({
        data: 'some very important information',
      });

      done();
    }
  );
});
