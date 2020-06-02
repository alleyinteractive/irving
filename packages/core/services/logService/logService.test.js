import getService from '.';

describe('logService', () => {
  it('should return an object of the correct shape', () => {
    const service = getService('irving:test');
    expect(Object.keys(service)).toMatchObject([
      'emerg',
      'alert',
      'crit',
      'error',
      'warning',
      'notice',
      'info',
      'debug',
    ]);
  });
});
