import getRelativeUrl from './getRelativeUrl';

it('should handle a relative url', () => {
  expect(getRelativeUrl('/foo')).toBe('/foo');
});

it('should handle a relative url with search parameters', () => {
  expect(getRelativeUrl('/foo/?param=test&another=second'))
    .toBe('/foo/?param=test&another=second');
});

it('should handle a relative url with a hash', () => {
  expect(getRelativeUrl('/foo#some-hash'))
    .toBe('/foo#some-hash');
});

it('should handle an internal, absolute URL with port', () => {
  expect(getRelativeUrl('http://localhost:3001/foo')).toBe('/foo');
});

it('should handle an internal absolute url with search query', () => {
  expect(getRelativeUrl('http://localhost:3001/foo/?s=test')).toBe('/foo/?s=test');
});

it('should handle an internal absolute url with hash', () => {
  expect(getRelativeUrl('http://localhost/foo#test'))
    .toBe('/foo#test');
});

it('should handle an internal absolute url with search query and hash', () => {
  expect(getRelativeUrl('http://localhost/foo/?s=search#test'))
    .toBe('/foo/?s=search#test');
});

it('should handle an external absolute url', () => {
  expect(getRelativeUrl('http://google.com')).toBe(false);
});

it('should not modify URLs with non http/https protocols', () => {
  expect(getRelativeUrl('mailto:ops@alley.co')).toBe(false);
});

it('should not modify URLs that match a configured passhtrough proxy', () => {
  expect(getRelativeUrl('/test/path/is/cool')).toBe(false);
});

it('should modify empty URLs so they lead home', () => {
  expect(getRelativeUrl('')).toBe('/');
});

it('should not modify URLs that begin with a hash', () => {
  expect(getRelativeUrl('#test-hash')).toBe(false);
});

it('should not modify URLs at a subdomain of the current domain', () => {
  expect(getRelativeUrl('https://content.irving.com')).toBe(false);
});
