import React from 'react';
import getReactComponent from 'config/componentMap';

/**
 * Recursively map a tree of API components to React elements.
 * @param {object} component - api component object
 * @param {string} keyPrefix
 * @return {object} - React Element
 */
export default function toReactElement(component, keyPrefix = '') {
  const { name, config, children } = component;
  return React.createElement(
    getReactComponent(name),
    { ...config, name, key: keyPrefix + name },
    children.map((child, index) => toReactElement(child, String(index)))
  );
}
