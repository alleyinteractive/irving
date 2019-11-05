import pxToRelative from './pxToRelative';

// Create a `em` function based on a root font size.
export const createEm = (base = 16) => (...pxVal) => (
  pxVal.map((value) => pxToRelative(value, base, 'em')).join(' ')
);

// Default function using 16px base.
const em = createEm();

export default em;
