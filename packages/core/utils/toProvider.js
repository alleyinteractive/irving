import React from 'react';
import getReactComponent from 'config/componentMap';

/**
 * Convert a component to a provider.
 *
 * @param {string} name Provider name.
 * @param {object} config Provider component API config.
 * @param {object|array} children React children.
 * @return {object} React Element
 */
export default function toProvider(name, config, children) {
  const props = {
    ...config,
    children,
    componentName: name,
    key: `provider_ ${name}`,
  };

  const type = getReactComponent(name, null);

  if (! type) {
    return children;
  }

  return React.createElement(type, props, children);
}
