import getMonitorService from './getServiceFromFilesystem';

describe('monitorService', () => {
  const monitorService = getMonitorService();

  it('should return an object of the correct shape', () => {
    expect(Object.keys(monitorService)).toMatchObject([
      'start',
      'logError',
      'logMessage',
      'logTransaction',
    ]);
  });
});
