import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Head = (props) => {
  const { children } = props;

  return (
    <Helmet>
      {children}
    </Helmet>
  );
};

Head.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Head;
