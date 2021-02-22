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

    expect(getProviderConfig(mockState, { name: 'irving/another-provider' }))
      .toEqual({
        config: {},
        children: [],
      });
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

    expect(getProviderConfig(mockState, { name: 'irving/test-provider' }))
      .toEqual({
        config: {
          lorem: 'ipsum',
        },
      });
  });
});
