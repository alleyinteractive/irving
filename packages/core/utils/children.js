/**
 * Find a React component using any prop
 *
 * @param {string} prop - The name of the prop to check.
 * @param {string} value - The value to check against.
 * @param {object[]} children - A collection of React elements.
 * @returns {object|null} - React Element
 */
export const findChild = (prop, value, children) => (
  children.find((element) => {
    const { props } = element;
    return value === props[prop];
  })
);

/**
 * Find a React component by api component name.
 *
 * @param {string} componentName The api component name.
 * @param {object[]} children A collection of React elements.
 * @returns {object|null} React Element
 */
export const findChildByName = (componentName, children) => (
  findChild('componentName', componentName, children)
);

/**
 * Filter a collection of React components by api component name.
 *
 * @param {string} prop The name of the prop to check.
 * @param {string} value The value to check against.
 * @param {object[]} children A collection of React elements.
 * @returns {object|null} React Elements
 */
export const filterChildren = (prop, value, children) => (
  children.filter((element) => {
    const { props } = element;
    return value === props[prop];
  })
);

/**
 * Filter a collection of React components by api component name.
 *
 * @param {string} componentName The api component name.
 * @param {object[]} children A collection of React elements.
 * @returns {object|null} React Elements
 */
export const filterChildrenByName = (componentName, children) => (
  filterChildren('componentName', componentName, children)
);

/**
 * Map an array of children into an object using the `group` prop.`
 *
 * @param {array} children An array of React components.
 * @returns {object} Mapping of children by group.
 */
export const groupChildren = (children) => {
  const mapping = {
    rest: [], // Array containing ungrouped children.
  };

  // If the `group` prop exists, and the group has been allow-listed, push the
  // child component.
  children.forEach((child) => {
    const { group } = child.props;

    if (group) {
      const currentGroup = mapping[group] || [];
      mapping[group] = currentGroup.concat(child);
    } else {
      mapping.rest = mapping.rest.concat(child);
    }
  });

  return mapping;
};
