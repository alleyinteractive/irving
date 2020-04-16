import getRouteKey from './getRouteKey';

describe('getRouteKey', () => {
  beforeEach(() => {
    // Allow myFunCookie to be included in routes.
    process.env.COOKIE_MAP_LIST = 'myFunCookie';
  });

  it('should use just pathname if search and cookies are empty', () => {
    const mockState = {
      route: {
        pathname: '/test-route',
        cookie: '',
        search: '?',
      },
    };
    expect(getRouteKey(mockState))
      .toEqual('/test-route');
  });

  it('should incorporate a search query if it exists', () => {
    const mockState = {
      route: {
        pathname: '/test-route',
        cookie: '',
        search: '?test-query=value',
      },
    };
    expect(getRouteKey(mockState))
      .toEqual('/test-route?test-query=value');
  });

  it('should incorporate a cookie query if it exists', () => {
    const mockState = {
      route: {
        pathname: '/test-route',
        cookie: { myFunCookie: 'test' },
        search: '',
      },
    };
    expect(getRouteKey(mockState))
      .toEqual('/test-route?myFunCookie=test');
  });

  it('should incorporate both cookie query and search after a `?` if both exist',
    () => {
      const mockState = {
        route: {
          pathname: '/test-route',
          cookie: { myFunCookie: 'test' },
          search: '?test-query=value',
        },
      };
      expect(getRouteKey(mockState))
        .toEqual('/test-route?myFunCookie=test&test-query=value');
    });
});
