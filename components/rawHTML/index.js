import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { plainText, richText } from 'config/html';

const RawHTML = (props) => {
  const { content, rich } = props;
  const html = sanitizeHtml(content, rich ? richText : plainText);
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} /> // eslint-disable-line react/no-danger
  );
};

RawHTML.propTypes = {
  content: PropTypes.string.isRequired,
  rich: PropTypes.bool,
};

RawHTML.defaultProps = {
  rich: true,
};

export default RawHTML;
