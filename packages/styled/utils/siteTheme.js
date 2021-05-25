import get from 'lodash/get';

/**
 * Get a value from the siteTheme object.
 *
 * @param {string} valuePath dot-separated path to the value you want.
 * @param {string} defaultValue default in case the value you want isn't
 *                              found or is undefined.
 * @param {string} ternaryValue turns `siteTheme` into a wrapper for a ternary
 *                              operator, checking `valuePath` as a boolean,
 *                              using `defaultValue` if true and `ternaryValue`
 *                              if false.
 * @return {mixed} siteTheme value.
 */
const siteTheme = (valuePath, defaultValue = '', ternaryValue = '') => (
  (props) => {
    // Each value could potentially be a path to get in the siteTheme,
    // so get that value if possible.
    const [
      normalizedValue,
      normalizedDefault,
      normalizedTernary,
    ] = [valuePath, defaultValue, ternaryValue].map(
      (val) => (
        (typeof val === 'string' && val.includes('.'))
          ? get(props, `theme.${val}`)
          : val
      ),
    );

    // Perform a ternary check if the ternary value is present.
    if (normalizedTernary) {
      return normalizedValue ? normalizedDefault : normalizedTernary;
    }

    // Return normalized value with default value as fallback.
    return normalizedValue || normalizedDefault;
  }
);

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
  const fullTree = !Object.keys(tree).length
    ? branch
    : tree;
  const topLevelKeys = new RegExp(
    `(${Object.keys(fullTree).join('|')})[\\[\\].A-Za-z0-9]+`,
    'g',
  );

  // Loop through each key in this branch.
  Object.keys(branch).forEach((key) => {
    if (typeof branch[key] === 'object') {
      modifiedBranch[key] = recursivelyBuildObjectTree(branch[key], fullTree);
    } else if (
      typeof branch[key] === 'string'
      && (
        branch[key].includes('.')
        || branch[key].includes('[')
      )
    ) {
      const returnPaths = branch[key].match(topLevelKeys) || [];

      // Recursively look for the returned value in the theme provider until
      // the default is returned.
      const resolvedValues = returnPaths.map((path) => {
        let newReturn = path;
        let defaultValue = path;

        do {
          defaultValue = newReturn;

          newReturn = get(
            fullTree,
            newReturn,
            defaultValue,
          );
        } while (newReturn !== defaultValue);

        return newReturn;
      });

      returnPaths.forEach((path, index) => {
        modifiedBranch[key] = modifiedBranch[key]
          .replace(path, resolvedValues[index]);
      });
    }
  });

  return modifiedBranch;
};

export default siteTheme;
