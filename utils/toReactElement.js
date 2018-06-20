import React from 'react';
import getReactComponent from 'config/componentMap';

// need to solve unique key problem
/**
 *
 * @param {object} component - api component object
 * @return {object} - React Element
 */
export default function toReactElement(component) {
  const { name, config, children } = component;
  return React.createElement(
    getReactComponent(name),
    { ...config, name, key: name },
    children.map(toReactElement)
  );
}
