import React from 'react';
import PropTypes from 'prop-types';

const Example = (props) => {
  const {
    myProp,
  } = props;

  return (
    <div>
      {myProp}
    </div>
  );
};

Example.propTypes = {
  myProp: PropTypes.string.isRequired,
};

export default Example;
