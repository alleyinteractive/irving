import React from 'react';
import PropTypes from 'prop-types';

const PageView = (props) => {
  const {
    postId,
  } = props;
  console.log(postId);
  return null;
};

PageView.defaultProps = {
  postId: 0,
};

PageView.propTypes = {
  postId: PropTypes.string,
};

export default PageView;
