import monitorService from './monitorService';

describe('monitorService', () => {
  it('should return an object of the correct shape', () => {
    const service = monitorService();
    expect(Object.keys(service)).toMatchObject(['start', 'logError', 'logTransaction']);
  });
});
