import getRequestUrl from './getRequestUrl';

describe('getRequestUrl', () => {
  beforeEach(() => {
    process.env.API_ROOT_URL = 'https://localhost.com';
  });

  it('Should return an absolute url', () => {
    expect(
      getRequestUrl('https://google.com')
    ).toEqual('https://google.com');
  });

  it('Should return a component data endpoint url', () => {
    expect(
      getRequestUrl('component')
    ).toEqual('https://localhost.com/data/component');
  });

  it('Should return an endpoint url with path', () => {
    expect(
      getRequestUrl('component/component')
    ).toEqual('https://localhost.com/component/component');
  });

  it('Should return an endpoint url with path and params', () => {
    expect(
      getRequestUrl('component/component?param=test')
    ).toEqual('https://localhost.com/component/component?param=test');
  });
});
