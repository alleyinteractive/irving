import React from 'react';
import PropTypes from 'prop-types';

const NotConfigured = (props) => {
  const { children, name } = props;

  return (
    <React.Fragment>
      <h1>
        Component
        {`"${name}"`}
        is not configured.
      </h1>
      {children}
    </React.Fragment>
  );
};

NotConfigured.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NotConfigured;
