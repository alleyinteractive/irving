import getCookies from './getCookies';

describe('getCookies', () => {
  beforeEach(() => {
    // Allow myFunCookie to be included in routes.
    process.env.ROUTE_COOKIES = 'myFunCookie';
    process.env.COOKIE_ALLOWLIST = 'anotherCookie';
  });

  it('should include default cookies if available', () => {
    const mockState = {
      route: {
        cookie: {
          bypassCache: true,
          authorizationBasicToken: 'loremipsum',
        },
      },
    };

    expect(getCookies(mockState)).toEqual({
      bypassCache: true,
      authorizationBasicToken: 'loremipsum',
    });
  });

  it('should include allowlisted route cookies', () => {
    const mockState = {
      route: {
        cookie: {
          authorizationBasicToken: 'loremipsum',
          myFunCookie: 'test',
        },
      },
    };

    expect(getCookies(mockState)).toEqual({
      authorizationBasicToken: 'loremipsum',
      myFunCookie: 'test',
    });
  });

  it('should include allowlisted app cookies', () => {
    const mockState = {
      route: {
        cookie: {
          authorizationBasicToken: 'loremipsum',
          myFunCookie: 'test',
          anotherCookie: 'dolorsitamet',
        },
      },
    };

    expect(getCookies(mockState)).toEqual({
      authorizationBasicToken: 'loremipsum',
      myFunCookie: 'test',
      anotherCookie: 'dolorsitamet',
    });
  });

  it('should exclude cookies not in the allowlist', () => {
    const mockState = {
      route: {
        cookie: {
          excludeMe: 'test',
        },
      },
    };

    expect(getCookies(mockState)).toEqual({});
  });
});
