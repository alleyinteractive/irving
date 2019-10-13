import getRelativeUrl from './getRelativeUrl';

it('should handle a relative url', () => {
  expect(getRelativeUrl('/foo')).toBe('/foo');
});

it('should handle a relative url with search parameters', () => {
  expect(getRelativeUrl('/foo/?param=test&another=second'))
    .toBe('/foo/?param=test&another=second');
});

it('should handle a relative url with a hash', () => {
  expect(getRelativeUrl('/foo#somehash'))
    .toBe('/foo#somehash');
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
