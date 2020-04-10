import getRouteKey from './getRouteKey';

beforeEach(() => {
  // Allow myFunCookie to be included in routes.
  process.env.COOKIE_MAP_LIST = 'myFunCookie';
});

it('Should use just pathname if search and cookies are empty', () => {
  const mockState = {
    route: {
      pathname: '/test-route',
      cookie: '',
      search: '?',
    },
  };

  const routeKey = getRouteKey(mockState);
  expect(routeKey).toEqual('/test-route');
});

it('Should incorporate a search query if it exists', () => {
  const mockState = {
    route: {
      pathname: '/test-route',
      cookie: '',
      search: '?test-query=value',
    },
  };

  const routeKey = getRouteKey(mockState);
  expect(routeKey).toEqual('/test-route?test-query=value');
});

it('Should incorporate a cookie query if it exists', () => {
  const mockState = {
    route: {
      pathname: '/test-route',
      cookie: { myFunCookie: 'test' },
      search: '',
    },
  };

  const routeKey = getRouteKey(mockState);
  expect(routeKey).toEqual('/test-route?myFunCookie=test');
});

it('Should incorporate both cookie query and search after a `?` if both exist',
  () => {
    const mockState = {
      route: {
        pathname: '/test-route',
        cookie: { myFunCookie: 'test' },
        search: '?test-query=value',
      },
    };

    const routeKey = getRouteKey(mockState);
    expect(routeKey).toEqual('/test-route?myFunCookie=test&test-query=value');
  });
