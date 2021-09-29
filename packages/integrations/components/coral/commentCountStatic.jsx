import React from 'react';
import PropTypes from 'prop-types';

const CommentCountStatic = (props) => {
  const {
    articleUrl,
    count,
    countText,
    noText,
  } = props;

  return (
    <span
      className="coral-count-static"
      data-coral-url={articleUrl}
      data-coral-notext={noText}
      data-coral-comment-count={count}
    >
      <span className="coral-count-number">{count}</span>
      <span className="coral-count-text">{countText}</span>
    </span>
  );
};

CommentCountStatic.defaultProps = {
  countText: 'Comments',
  noText: false,
};

CommentCountStatic.propTypes = {
  articleUrl: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  countText: PropTypes.string,
  noText: PropTypes.bool,
};

export default CommentCountStatic;
