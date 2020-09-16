import createGetFromProviderConfig from './createGetFromProviderConfig';

describe('createGetFromProviderConfig', () => {
  const getProviderConfig = createGetFromProviderConfig();

  it('should return null by default if either provider or config key does not exist', () => {
    expect(createGetFromProviderConfig(
      'irving/test-provider',
      'test-key'
    )()).toEqual(null);
  });

  it('should return the current value of a key if it exists', () => {
    const mockState = {
      components: {
        providers: {
          'irving/test-provider': {
            current: {
              config: {
                lorem: 'ipsum',
              },
            },
          },
        },
      },
    };

    expect(createGetFromProviderConfig(
      'irving/test-provider',
      'lorem'
    )(mockState)).toEqual('ipsum');
  });
});
