import React from 'react';
import PropTypes from 'prop-types';

const Container = (props) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
};

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Container;

