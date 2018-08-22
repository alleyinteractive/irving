/**
 * Find a React component using any prop
 *
 * @param {string} prop - The name of the prop to check.
 * @param {string} value - The value to check against.
 * @param {object[]} children - A collection of React elements.
 * @returns {object|null}
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
 * @param {string} componentName - The api component name.
 * @param {object[]} children - A collection of React elements.
 * @returns {object|null}
 */
export const findChildByName = (componentName, children) => (
  findChild('componentName', componentName, children)
);

/**
 * Filter a collection of React components by api component name.
 *
 * @param {string} prop - The name of the prop to check.
 * @param {string} value - The value to check against.
 * @param {object[]} children - A collection of React elements.
 * @returns {object[]}
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
 * @param {string} componentName - The api component name.
 * @param {object[]} children - A collection of React elements.
 * @returns {object[]}
 */
export const filterChildrenByName = (componentName, children) => (
  filterChildren('componentName', componentName, children)
);
