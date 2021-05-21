/* eslint-disable max-len */
/* globals it, describe, expect */
import isValidURL from './isValidURL';

describe('isValidURL', () => {
  it('should return tru for the happy path', () => {
    expect(isValidURL('https://starwars.com')).toEqual(true);
    expect(isValidURL('http://starwars.com')).toEqual(true);
  });

  it('should return true for various valid urls', () => {
    expect(isValidURL('https://yoda.dark.luke.xyz')).toEqual(true);
    expect(isValidURL('https://yoda-dark-luke.com')).toEqual(true);
    expect(isValidURL('https://YODA-dark-luke.com')).toEqual(true);
    expect(isValidURL('https://123-88.com')).toEqual(true);
  });

  it('should return false due to bad protocols', () => {
    expect(isValidURL('htts://starwars.com')).toEqual(false);
    expect(isValidURL('https//starwars.com')).toEqual(false);
    expect(isValidURL('error: bad yoda. bad.')).toEqual(false);
    expect(isValidURL('')).toEqual(false);
  });

  it('should return false when non string values are passed', () => {
    expect(isValidURL([])).toEqual(false);
    expect(isValidURL({})).toEqual(false);
    expect(isValidURL(null)).toEqual(false);
    expect(isValidURL(0)).toEqual(false);
    expect(isValidURL(undefined)).toEqual(false);
  });
});
