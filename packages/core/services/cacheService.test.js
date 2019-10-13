import cacheService from './cacheService';

describe('cacheService', () => {
  it('should return an object of the correct shape', () => {
    const service = cacheService();
    expect(Object.keys(service)).toMatchObject(['client', 'get', 'set', 'del']);
  });
});
