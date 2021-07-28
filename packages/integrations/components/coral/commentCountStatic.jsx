import React from 'react';
import PropTypes from 'prop-types';

const CommentCountStatic = (props) => {
  const {
    count,
    countText,
  } = props;

  return (
    <span className="coral-count">
      <span className="coral-count-number">{count}</span>
      <span className="coral-count-text">{countText}</span>
    </span>
  );
};

CommentCountStatic.defaultProps = {
  countText: 'Comments',
};

CommentCountStatic.propTypes = {
  count: PropTypes.number.isRequired,
  countText: PropTypes.string,
};

export default CommentCountStatic;
