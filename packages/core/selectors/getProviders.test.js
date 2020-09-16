import getProviders from './getProviders';

describe('getProviders', () => {
  it('should get empty array by default', () => {
    expect(getProviders()).toEqual([]);
  });

  it('should get provider\'s names', () => {
    const mockState = {
      components: {
        providers: {
          'irving/test-provider': {},
          'irving/another-provider': {},
        },
      },
    };

    expect(getProviders(mockState)).toEqual([
      'irving/test-provider',
      'irving/another-provider',
    ]);
  });
});
