import { isString, omit } from 'lodash';
import React from 'react';
import getReactComponent from 'config/componentMap';

/**
 * Recursively map a tree of API components to React elements.
 * @param {object} apiComponent - api component object
 * @param {string} keyPrefix
 * @return {object} - React Element
 */
export default function toReactElement(apiComponent, keyPrefix = '') {
  const {
    name,
    config,
    children,
  } = apiComponent;

  let props = {
    ...config,
    componentName: name,
    key: keyPrefix + name,
  };

  const childElements = isString(children) ?
    // Support text nodes.
    children :
    children.map((child, index) => toReactElement(child, String(index)));

  // For native DOM elements strip componentName prop, because it's technically
  // not a valid element attribute.
  const type = getReactComponent(name);
  if ('string' === typeof type) {
    props = omit(['componentName'], props);
  }

  return React.createElement(type, props, childElements);
}
