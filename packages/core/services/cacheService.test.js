jest.mock('./cacheService');
const cacheService = require('./cacheService');

// Set up the mocked cache service.
describe('cacheService', () => {
  it('should return an object of the correct shape', () => {
    const service = cacheService();
    expect(Object.keys(service)).toMatchObject(['client', 'get', 'set', 'del']);
  });
});
