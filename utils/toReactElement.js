import { isString, omit } from 'lodash/fp';
import React from 'react';
import getReactComponent from 'config/componentMap';

/**
 * Recursively map a tree of API components to React elements.
 * @param {object} apiComponent - api component object
 * @param {string} keyPrefix
 * @return {object} - React Element
 */
export default function toReactElement(
  apiComponent,
  keyPrefix = '',
  additionalProps = {},
) {
  const {
    name,
    config,
    children,
  } = apiComponent;

  let props = {
    ...config,
    componentName: name,
    key: `${keyPrefix}_ ${name}`,
    ...additionalProps,
  };

  const childElements = children.map((child, index) => (
    // Support text nodes.
    isString(child) ? child : toReactElement(child, String(index))
  ));

  const type = getReactComponent(name);
  const isNativeDOMElm = 'string' === typeof type;
  if (isNativeDOMElm) {
    // Strip non valid element attribute.
    props = omit(['componentName'], props);

    // Support self closing tags.
    if (! childElements.length) {
      return React.createElement(type, props);
    }
  }

  return React.createElement(type, props, childElements);
}
