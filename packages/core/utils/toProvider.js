import React from 'react';
import PropTypes from 'prop-types';
import getReactComponent from 'config/componentMap';

const DefaultProvider = ({ children }) => (
  <>{children}</>
);

DefaultProvider.propTypes = {
  /**
   * React children.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
      ])
    ),
    PropTypes.object,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

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

  const type = getReactComponent(name, DefaultProvider);

  return React.createElement(type, props);
}
