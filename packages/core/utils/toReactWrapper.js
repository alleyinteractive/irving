import React from 'react';
import getReactComponent from 'config/componentMap';

/**
 * Recursively map a tree of API components to React elements.
 *
 * @param {object} apiComponent Api component object
 * @param {bool|ReactElement|array} children Child components to override children in API
 * @param {string} keyPrefix Prefix for react component key
 * @return {object} React Element
 */
export default function toReactWrapper(
  wrappers,
  children,
  keyPrefix = ''
) {
  const apiComponent = wrappers[0];
  const {
    name,
    config,
  } = apiComponent;
  const props = {
    ...config,
    componentName: name,
    key: `${keyPrefix}_ ${name}`,
  };
  // When we run out of wrappers/providers, the children will be rendered.
  let childWrappers = children;

  // If there are more configured wrappers, nest them within each other.
  if (1 < wrappers.length) {
    const remainingWrappers = wrappers.slice(1);
    childWrappers = toReactWrapper(
      remainingWrappers,
      children,
      String(wrappers.length)
    );
  }

  const type = getReactComponent(name);

  return React.createElement(type, props, childWrappers);
}
