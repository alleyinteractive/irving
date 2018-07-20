import { isString } from 'lodash';
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

  const props = {
    ...config,
    name,
    key: keyPrefix + name,
  };

  const childElements = isString(children) ? children : // text node
    children.map((child, index) => toReactElement(child, String(index)));

  return React.createElement(
    getReactComponent(name),
    props,
    childElements
  );
}
