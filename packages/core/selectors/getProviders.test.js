import getProviders from './getProviders';

describe('getProviders', () => {
  it('should get empty array by default', () => {
    expect(getProviders()).toEqual([]);
  });

  it('should get provider\'s object', () => {
    const mockState = {
      route: {
        pathname: '/foo',
      },
      components: {
        providers: {
          '/foo': [
            {
              name: 'provider-test',
            },
          ],
        },
      },
    };
    expect(getProviders(mockState)).toEqual([
      { name: 'provider-test' },
    ]);
  });

  it('should get provider\'s objects', () => {
    const mockState = {
      route: {
        pathname: '/foo',
      },
      components: {
        providers: {
          '/foo': [
            {
              name: 'provider-test',
            },
            {
              name: 'another-provider',
            },
          ],
        },
      },
    };
    expect(getProviders(mockState)).toEqual([
      {
        name: 'provider-test',
      },
      {
        name: 'another-provider',
      },
    ]);
  });
});
