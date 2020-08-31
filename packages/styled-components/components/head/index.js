import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Head = (props) => {
  const {
    children,
  } = props;

  return (
    <Helmet>
      {children.map((child) => {
        const {
          type,
        } = child;

        // Check the component type.
        if ('style' !== type && 'script' !== type) {
          return child;
        }

        // Validate a non-empty array.
        if (! Array.isArray(child.props.children) ||
          ! child.props.children.length) {
          return child;
        }

        // <Helmet> require the `children` prop for `style` and `script`
        // elements to be a string. In this scenario, we reduce the array
        // to a single string using `join`, and return the cloned element
        // with the modified value.
        return cloneElement(
          child,
          {
            children: child.props.children.join(''),
          }
        );
      })}
    </Helmet>
  );
};

Head.defaultProps = {
  children: {},
};

Head.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
};

export { Head as Component };

export default Head;
