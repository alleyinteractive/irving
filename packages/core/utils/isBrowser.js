import isNode from './isNode';

const isBrowser = () => (
  ! isNode() && 'undefined' !== typeof window
);

export default isBrowser;
