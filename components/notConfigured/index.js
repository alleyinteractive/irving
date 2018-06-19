import React from 'react';
import PropTypes from 'prop-types';

const NotConfigured = (props) => (
  <React.Fragment>
    <h1>Component {`"${props.name}"`} is not configured.</h1>
    {props.children}
  </React.Fragment>
);

NotConfigured.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NotConfigured;
