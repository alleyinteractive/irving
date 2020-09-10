import createGetProviderConfig from './createGetProviderConfig';

describe('createGetProviderConfig', () => {
  const getProviderConfig = createGetProviderConfig();

  it('should get empty object by default', () => {
    expect(getProviderConfig()).toEqual({});
  });

  it('should get an empty object if provider name does not exist in state', () => {
    const mockState = {
      components: {
        providers: {
          'irving/test-provider': {},
        },
      },
    };

    expect(getProviderConfig(mockState, 'irving/another-provider'))
      .toEqual({});
  });

  it('should retrieve the current config if provider is in state', () => {
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

    expect(getProviderConfig(mockState, 'irving/test-provider'))
      .toEqual({
        lorem: 'ipsum',
      });
  });
});
