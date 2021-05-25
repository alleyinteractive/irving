import React from 'react';
import PropTypes from 'prop-types';

const DefaultAppContent = (props) => {
  const { IrvingApp } = props;

  return <IrvingApp />;
};

DefaultAppContent.propTypes = {
  IrvingApp: PropTypes.func.isRequired,
};

export default DefaultAppContent;
