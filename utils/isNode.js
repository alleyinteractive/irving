const isNode = () => 'undefined' !== typeof process &&
  process.release &&
  'node' === process.release.name;

export default isNode;
