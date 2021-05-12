import generateLogInfo from './generateLogInfo';

describe('generateLogInfo', () => {
  it('should should convert a plain string into an info object', () => {
    const messages = ['lorem ipsum dolor sit amet'];
    const logInfo = generateLogInfo('info', messages);

    expect(logInfo).toEqual({
      level: 'info',
      message: 'lorem ipsum dolor sit amet',
    });
  });

  it('should format strings using util.format', () => {
    const messages = [
      'this is an object: %o and this is a string: %s',
      { lorem: 'ipsum' },
      'lorem ipsum dolor sit amet',
    ];
    const logInfo = generateLogInfo('info', messages);

    expect(logInfo).toEqual({
      level: 'info',
      message: `this is an object: { lorem: 'ipsum' } and this is a string: lorem ipsum dolor sit amet`,
    });
  });

  it('should should provide a name and stack trace using Error object if method is `error`', () => {
    const messages = ['lorem ipsum dolor sit amet'];
    const logInfo = generateLogInfo('error', messages);

    expect(logInfo).toMatchObject({
      level: 'error',
      message: 'lorem ipsum dolor sit amet',
      name: 'Error',
      stack: expect.stringContaining('Error: lorem ipsum dolor sit amet'),
    });
  });

  it('should should use an Error object as-is if passed in as a message', () => {
    const messages = [new Error('lorem ipsum dolor sit amet')];
    const logInfo = generateLogInfo('error', messages);

    expect(logInfo).toMatchObject({
      level: 'error',
      message: 'lorem ipsum dolor sit amet',
      name: 'Error',
      stack: expect.stringContaining('Error: lorem ipsum dolor sit amet'),
    });
  });
});
