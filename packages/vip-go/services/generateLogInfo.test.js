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

    expect(logInfo).toEqual({
      level: 'error',
      message: 'lorem ipsum dolor sit amet',
      name: 'Error',
      stack: `Error: lorem ipsum dolor sit amet
    at generateLogInfo (/Users/owenstowe/broadway/www/irving/packages/vip-go/services/generateLogInfo.js:14:17)
    at Object.<anonymous> (/Users/owenstowe/broadway/www/irving/packages/vip-go/services/generateLogInfo.test.js:30:21)
    at Object.asyncJestTest (/Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:106:37)
    at /Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/queueRunner.js:45:12
    at new Promise (<anonymous>)
    at mapper (/Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/queueRunner.js:28:19)
    at /Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/queueRunner.js:75:41
    at processTicksAndRejections (internal/process/task_queues.js:97:5)`,
    });
  });

  it('should should use an Error object as-is if passed in as a message', () => {
    const messages = [new Error('lorem ipsum dolor sit amet')];
    const logInfo = generateLogInfo('error', messages);

    expect(logInfo).toEqual({
      level: 'error',
      message: 'lorem ipsum dolor sit amet',
      name: 'Error',
      stack: `Error: lorem ipsum dolor sit amet
    at Object.<anonymous> (/Users/owenstowe/broadway/www/irving/packages/vip-go/services/generateLogInfo.test.js:49:23)
    at Object.asyncJestTest (/Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:106:37)
    at /Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/queueRunner.js:45:12
    at new Promise (<anonymous>)
    at mapper (/Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/queueRunner.js:28:19)
    at /Users/owenstowe/broadway/www/irving/node_modules/jest-jasmine2/build/queueRunner.js:75:41
    at processTicksAndRejections (internal/process/task_queues.js:97:5)`,
    });
  });
});
