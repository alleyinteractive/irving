/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Head = (props) => {
  const {
    children,
  } = props;

  return (
    <Helmet>
      {children}
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

export { Head as PureComponent };

export const StyledComponent = Head;

export default Head;
