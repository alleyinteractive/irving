import React from 'react';
import PropTypes from 'prop-types';

const NotConfigured = (props) => {
  const { children, componentName } = props;

  return (
    <>
      <h1>
        Component
        {`"${componentName}"`}
        is not configured.
      </h1>
      {children}
    </>
  );
};

NotConfigured.propTypes = {
  /**
   * Name of component that is not configured in `componentMap.js`
   */
  componentName: PropTypes.string.isRequired,
  /**
   * Child components
   */
  children: PropTypes.node.isRequired,
};

export default NotConfigured;
