import { getRedirect } from './customizeRedirect';
import get from 'lodash/fp/get';

describe('customizeRedirect', () => {
  const createRequestGet = (request) => (key) => (
    get(key, request)
  );

  it('redirect to a completely new host', () => {
    const request = {
      hostname: 'irving.test',
      protocol: 'https',
      get: () => {},
    };
    const config = {
      host: 'mysite.irving.test',
    };
    const redirect = getRedirect(request, config);
    expect(redirect).toBe('https://mysite.irving.test');
  });

  it('ignore subdomain settings if host config is set', () => {
    const request = {
      hostname: 'irving.test',
      protocol: 'https',
      get: () => {},
    };
    const config = {
      host: 'mysite.irving.test',
      subdomain: 'www',
      reverse: true,
    };
    const redirect = getRedirect(request, config);
    expect(redirect).toBe('https://mysite.irving.test');
  });

  it('should redirect naked to subdomain', () => {
    const request = {
      hostname: 'irving.test',
      protocol: 'https',
      get: () => {},
    };
    const config = {
      subDomain: 'www',
      reverse: false,
    };
    const redirect = getRedirect(request, config);
    expect(redirect).toBe('https://www.irving.test');
  });

  it('should redirect subdomain to naked', () => {
    const request = {
      hostname: 'www.irving.test',
      protocol: 'https',
      get: () => {},
    };
    const config = {
      subDomain: 'www',
      reverse: true,
    };
    const redirect = getRedirect(request, config);
    expect(redirect).toBe('https://irving.test');
  });

  it('should redirect http to https using the https', () => {
    const request = {
      hostname: 'irving.test',
      protocol: 'http',
      get: () => {},
    };
    const config = {
      https: true,
    };
    const redirect = getRedirect(request, config);
    expect(redirect).toBe('https://irving.test');
  });

  it('should redirect to a custom protocol and ignore https setting if custom protocol is set', () => {
    const request = {
      hostname: 'irving.test',
      protocol: 'http',
      get: () => {},
    };
    const config = {
      protocol: 'ftp',
      https: true,
    };
    const redirect = getRedirect(request, config);
    expect(redirect).toBe('ftp://irving.test');
  });

  it('redirect both subdomain and protocol', () => {
    const request = {
      hostname: 'irving.test',
      protocol: 'http',
      get: () => {},
    };
    const config = {
      https: true,
      subDomain: 'mysite',
    };
    const redirect = getRedirect(request, config);
    expect(redirect).toBe('https://mysite.irving.test');
  });

  it('should not redirect twice', () => {
    const request = {
      hostname: 'irving.test',
      protocol: 'http',
      get: () => {},
    };
    const config = {
      https: true,
      subDomain: 'mysite',
    };
    const redirect = getRedirect(request, config);

    const requestTwo = {
      hostname: 'mysite.irving.test',
      'x-forwarded-proto': 'https',
    };
    const reqGet = createRequestGet(requestTwo);
    const secondRedirect = getRedirect({
      ...requestTwo,
      get: reqGet,
    }, config);

    expect(redirect).toBe('https://mysite.irving.test');
    expect(secondRedirect).toBeNull();
  });
});
