import getEndpointUrl from './getEndpointUrl';

describe('getEndpointUrl', () => {
  beforeEach(() => {
    process.env.API_ROOT_URL = 'https://localhost.com';
  });

  it('Should return an absolute url', () => {
    expect(
      getEndpointUrl('https://google.com')
    ).toEqual('https://google.com');
  });

  it('Should return a form endpoint url', () => {
    expect(
      getEndpointUrl('component')
    ).toEqual('https://localhost.com/form/component');
  });

  it('Should return a custom endpoint url at your api root', () => {
    expect(
      getEndpointUrl('form/one')
    ).toEqual('https://localhost.com/form/one');
  });

  it('Should return a form endpoint url with path and params', () => {
    expect(
      getEndpointUrl('form/two?param=test')
    ).toEqual('https://localhost.com/form/two?param=test');
  });
});
