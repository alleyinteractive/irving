import get from 'lodash/get';

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
export const recursivelyBuildObjectTree = (branch, tree) => {
  const modifiedBranch = branch;

  // Loop through each key in this branch.
  Object.keys(branch).forEach((key) => {
    if ('object' === typeof branch[key]) {
      modifiedBranch[key] = recursivelyBuildObjectTree(branch[key], tree);
    } else if ('string' === typeof branch[key] && branch[key].includes('.')) {
      let returnValue = branch[key];
      let defaultValue = returnValue;

      // Recursively look for the returned value in the theme provider until
      // the default is returned.
      do {
        defaultValue = returnValue;

        returnValue = get(
          tree,
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
