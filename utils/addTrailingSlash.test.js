import addTrailingSlash from './addTrailingSlash';

describe('addTrailingSlash', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // clear the module cache
    process.env = { ...OLD_ENV }; // reset to old env vars.
    process.env.CONFIG_FORCE_TRAILING_SLASHES = true;
  });

  it('should add a trailling slash to URLs without one', () => {
    expect(addTrailingSlash('/foo')).toBe('/foo/');
    expect(addTrailingSlash('https://www.test.com/foo')).toBe('https://www.test.com/foo/');
  });

  it('should leave URLs with a trailing slash as-is', () => {
    expect(addTrailingSlash('/foo/')).toBe('/foo/');
    expect(addTrailingSlash('https://www.test.com/foo/')).toBe('https://www.test.com/foo/');
  });

  it('should not add a trailling slash to a filepath', () => {
    expect(addTrailingSlash('/assets/file.jpg')).toBe('/assets/file.jpg');
    expect(addTrailingSlash('https://www.test.com/foo/file.jpg')).toBe('https://www.test.com/foo/file.jpg');
  });

  it('should do nothing if the appropriate ENV var is not set', () => {
    process.env.CONFIG_FORCE_TRAILING_SLASHES = false;

    expect(addTrailingSlash('/foo')).toBe('/foo');
    expect(addTrailingSlash('https://www.test.com/foo')).toBe('https://www.test.com/foo');
  });
});
