import omit from 'lodash/fp/omit';
import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import EmbedContainer from 'react-oembed-container';
import { plainText, richText } from 'config/html';

const RawHTML = (props) => {
  const {
    content,
    rich,
    oembed,
    className,
  } = props;
  const html = sanitizeHtml(content, rich ? richText : plainText);

  if (oembed) {
    return (
      <EmbedContainer markup={content}>
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
        />
      </EmbedContainer>
    );
  }
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
    />
  );
};

RawHTML.propTypes = {
  /**
   * HTML content to displayed using `dangerouslySetInnerHTML`
   */
  content: PropTypes.string.isRequired,
  /**
   * Is the content of this component Rich Text or Plain Text? This prop determines which configuration for sanitize-html will be used.
   */
  rich: PropTypes.bool,
  /**
   * Does this markup contain oembeds?
   */
  oembed: PropTypes.bool,
};

RawHTML.defaultProps = {
  rich: true,
  oembed: false,
};

export default RawHTML;
