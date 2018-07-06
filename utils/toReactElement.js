import { isString } from 'lodash';
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
  const props = {
    ...config,
    name,
    key: keyPrefix + name,
  };
  const childElements = isString(children) ?
    children :
    children.map((child, index) => toReactElement(child, String(index)));
  return React.createElement(
    getReactComponent(name),
    props,
    childElements
  );
}
