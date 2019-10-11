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
  });

  it('should leave URLs with a trailing slash as-is', () => {
    expect(addTrailingSlash('/foo/')).toBe('/foo/');
  });

  it('should do nothing if the appropriate ENV var is not set', () => {
    process.env.CONFIG_FORCE_TRAILING_SLASHES = false;

    expect(addTrailingSlash('/foo')).toBe('/foo');
  });
});
