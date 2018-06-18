import React from 'react';
import PropTypes from 'prop-types';

const NotConfigured = (props) => (
  <h1>This component ({ props.name }) appears to not be configured.</h1>
);

NotConfigured.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NotConfigured;
