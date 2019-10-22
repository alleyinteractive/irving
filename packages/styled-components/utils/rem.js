import pxToRelative from './pxToRelative';

// Create a `rem` function based on a root font size.
export const createRem = (base = 16) => (...pxVal) => (
  pxVal.map((value) => pxToRelative(value, base, 'rem')).join(' ')
);

// Default function using 16px base.
const rem = createRem();

export default rem;
