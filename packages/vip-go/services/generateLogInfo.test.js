/* eslint-disable max-len */
/* globals it, describe, expect */
import generateLogInfo from './generateLogInfo';

describe('generateLogInfo', () => {
  it('should should convert a plain string into an info object', () => {
    const message = ['lorem ipsum dolor sit amet'];
    const logInfo = generateLogInfo('info', message);

    expect(logInfo).toEqual({
      level: 'info',
      message,
    });
  });

  it('should format and object to a format ready for debug packages to output', () => {
    const messages = [
      '%O',
      { lorem: 'ipsum' },
    ];
    const logInfo = generateLogInfo('info', messages);

    expect(logInfo).toEqual({
      level: 'info',
      message:[
        '%O',
        { lorem: 'ipsum' },
      ],
    });
  });

  it('should properly format sentry tags, extra and contexts', () => {
    const messages = [
      'Help me, Obi-Wan Kenobi. You’re my only hope.',
      {
        contexts: {
          yoda: {
            age: 18394576,
            location: 'Dagobah'
          },
        },
        extra: {
          planet: 'niboo',
        },
        tags: {
          ROOT_URL: 'https://starwars.com',
        },
      }
    ]
    const logInfo = generateLogInfo('error', messages);

    expect(logInfo).toEqual({
      level: 'error',
      tags: {
          ROOT_URL: 'https://starwars.com',
      },
      message: ['Help me, Obi-Wan Kenobi. You’re my only hope.'],
      name: "Error",
      stack: expect.stringContaining('Help me, Obi-Wan'),
      contexts: {
        yoda: {
          age: 18394576,
          location: 'Dagobah'
        },
      },
      extra: {
        planet: 'niboo',
      },
      tags: {
        ROOT_URL: 'https://starwars.com',
      },
    });
  });


  it('should should provide a name and stack trace using Error object if method is `error`', () => {
    const messages = ['lorem ipsum dolor sit amet'];
    const logInfo = generateLogInfo('error', messages);

    expect(logInfo).toMatchObject({
      level: 'error',
      message: ['lorem ipsum dolor sit amet'],
      name: 'Error',
      stack: expect.stringContaining('Error: lorem ipsum dolor sit amet'),
    });
  });

  it('should should use an Error object as-is if passed in as a message', () => {
    const messages = [new Error('lorem ipsum dolor')];
    const logInfo = generateLogInfo('error', messages);

    expect(logInfo).toMatchObject({
      level: 'error',
      message: [messages[0].message],
      name: 'Error',
      stack: expect.stringContaining('Error: lorem ipsum dolor'),
    });
  });
});
