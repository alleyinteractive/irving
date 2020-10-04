import get from 'lodash/get';
import rem from './rem';

/**
 * Recursively build an object tree.
 *
 * Recursively loop through an object where any given key could be a nested
 * object, or a dot-notation string, resolving to somewhere else in the object
 * tree.
 *
 * @param {object} branch The current branch being resolved.
 * @param {object} tree   The original tree structure.
 * @return {object} Resolved object
 */
export const recursivelyBuildObjectTree = (branch, tree = {}) => {
  const modifiedBranch = branch;
  const fullTree = (0 === Object.keys(tree).length) ?
    branch :
    tree;

  // Loop through each key in this branch.
  Object.keys(branch).forEach((key) => {
    if ('object' === typeof branch[key]) {
      modifiedBranch[key] = recursivelyBuildObjectTree(branch[key], fullTree);
    } else if ('string' === typeof branch[key] && branch[key].includes('.')) {
      let returnValue = branch[key];
      let defaultValue = returnValue;

      // Recursively look for the returned value in the theme provider until
      // the default is returned.
      do {
        defaultValue = returnValue;

        returnValue = get(
          fullTree,
          returnValue,
          defaultValue
        );
      } while (returnValue !== defaultValue);

      modifiedBranch[key] = returnValue;
    }
  });

  return modifiedBranch;
};

const siteTheme = (valuePath, defaultValue = '') => (props) => (
  get(props, `theme.${valuePath}`, defaultValue)
);

export default siteTheme;

export const breakpoint = (width, minMax = 'min') => (props) => {
  const value = siteTheme(`breakpoints.${width}`)(props);

  switch (minMax) {
    default:
    case 'min':
      return `${minMax}-width: ${rem(value)}`;

    case 'max':
      return `${minMax}-width: ${rem(value - 1)}`;
  }
};
