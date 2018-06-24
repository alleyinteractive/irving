import getRelativeUrl from './getRelativeUrl';

it('should handle a relative url', () => {
  expect(getRelativeUrl('/foo')).toBe('/foo');
});

it('should handle an internal absolute url', () => {
  expect(getRelativeUrl('http://localhost/foo')).toBe('/foo');
});

it('should handle an external absolute url', () => {
  expect(getRelativeUrl('http://google.com')).toBe(false);
});
