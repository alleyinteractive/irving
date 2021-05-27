import getRouteCookies from './getRouteCookies';

describe('getRouteCookies', () => {
  beforeEach(() => {
    // Allow myFunCookie to be included in routes.
    process.env.ROUTE_COOKIES = 'myFunCookie';
  });

  it('should default to empty', () => {
    const mockState = {
      route: {
        cookie: {
          testCookie: 'test',
        },
      },
    };

    expect(getRouteCookies(mockState)).toEqual({});
  });

  it('should not include auth cookies', () => {
    const mockState = {
      route: {
        cookie: {
          authorizationBasicToken: 'loremipsum',
        },
      },
    };

    expect(getRouteCookies(mockState)).toEqual({});
  });

  it('should include allowlisted cookies', () => {
    const mockState = {
      route: {
        cookie: {
          myFunCookie: 'test',
        },
      },
    };

    expect(getRouteCookies(mockState)).toEqual({ myFunCookie: 'test' });
  });
});
