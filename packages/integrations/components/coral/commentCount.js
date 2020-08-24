import React from 'react';
import PropTypes from 'prop-types';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';

const CommentCount = (props) => {
  const {
    articleUrl,
    embedUrl,
    noText,
  } = props;

  // We need an embedUrl and articleUrl to proceed.
  if (! embedUrl || ! articleUrl) {
    return null;
  }

  useLoadScript(
    `${embedUrl}/assets/js/count.js`,
    null,
    {
      attr: {
        className: 'coral-script',
        defer: true,
      },
    }
  );

  return (
    <span
      className="coral-count"
      data-coral-url={articleUrl}
      data-coral-notext={noText}
    />
  );
};

CommentCount.defaultProps = {
  noText: false,
};

CommentCount.propTypes = {
  articleUrl: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  noText: PropTypes.bool,
};

export default CommentCount;
