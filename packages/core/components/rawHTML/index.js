import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sanitizeHtml from 'sanitize-html';
import EmbedContainer from 'react-oembed-container';
import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import { plainText, richText } from 'config/html';
import styles from './rawHTML.css';

/* eslint-disable */
const RawHTML = (props) => {
  const {
    content,
    rich,
    oembed,
    className,
    theme,
  } = props;
  const html = sanitizeHtml(content, rich ? richText : plainText);

  if (oembed) {
    return (
      <EmbedContainer markup={content}>
        <div
          className={classnames(theme.wrapper, className)}
          dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
        />
      </EmbedContainer>
    );
  }

  return (
    <div
      className={classnames(theme.wrapper, className)}
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
  /**
   * Additional classname for component wrapper.
   */
  className: PropTypes.string,
  /**
   * Theme object.
   */
  theme: PropTypes.object.isRequired,
};

RawHTML.defaultProps = {
  rich: true,
  oembed: false,
  className: '',
};

const wrapWithThemes = withThemes('RawHTML', { default: styles });

export const themeRawHTML = createWithUserThemes(RawHTML, styles);
export default wrapWithThemes(RawHTML);
