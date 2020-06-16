import addTrailingSlash from './addTrailingSlash';
jest.mock('../irving.config.server.js');

describe('addTrailingSlash', () => {
  it('should add a trailling slash to URLs without one', () => {
    expect(addTrailingSlash('/foo', true)).toBe('/foo/');
    expect(addTrailingSlash('https://www.test.com/foo' ,true)).toBe('https://www.test.com/foo/');
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
    expect(addTrailingSlash('/foo')).toBe('/foo');
    expect(addTrailingSlash('https://www.test.com/foo')).toBe('https://www.test.com/foo');
  });

  it('should skip by urls on the configured trailingSlashDenyList', () => {
    expect(addTrailingSlash('/no-trailing-slash')).toBe('/no-trailing-slash');
  });
});
