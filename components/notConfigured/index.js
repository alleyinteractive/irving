import React from 'react';
import PropTypes from 'prop-types';

const NotConfigured = (props) => (
  <React.Fragment>
    <h1>Component {`"${props.name}"`} is not configured.</h1>
    {props.children}
  </React.Fragment>
);

NotConfigured.propTypes = {
  /**
   * Name of component that is not configured in `componentMap.js`
   */
  name: PropTypes.string.isRequired,
  /**
   * Child components
   */
  children: PropTypes.node.isRequired,
};

export default NotConfigured;
