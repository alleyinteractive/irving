/**
 * Reasonable detect if we are executing in a NodeJS environment.
 * @returns {boolean}
 */
export default function isNode() {
  return 'undefined' !== typeof process &&
    process.release &&
    'node' === process.release.name;
}
