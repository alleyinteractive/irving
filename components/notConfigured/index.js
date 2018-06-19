import React from 'react';
import PropTypes from 'prop-types';

const NotConfigured = (props) => (
  <h1>Component {`"${props.name}"`} is not configured.</h1>
);

NotConfigured.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NotConfigured;
