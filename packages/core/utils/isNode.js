/**
 * Reasonable detect if we are executing in a NodeJS environment.
 * @returns {boolean}
 */
export default function isNode() {
  return typeof process !== 'undefined'
    && process.release
    && process.release.name === 'node';
}
