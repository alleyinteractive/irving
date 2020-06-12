import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import EmbedContainer from 'react-oembed-container';
import { richText } from '@irvingjs/core/config/html';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';
import * as unstyled from './themes/unstyled';

/**
 * HTML component.
 *
 * Use `dangerouslySetInnerHTML` to render HTML.
 *
 * @todo Revisit the default styles for this.
 * @todo Replace with relative units.
 */
const HTML = (props) => {
  const {
    content,
    oembed,
    style,
    tag,
    theme = defaultStyles,
  } = props;

  const {
    HTMLWrapper,
  } = theme;

  // Sanitize our markup.
  const html = sanitizeHtml(content, richText);

  return (
    <>
      {(oembed) ? (
        <EmbedContainer markup={content}>
          <HTMLWrapper
            as={tag}
            dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
            style={style}
          />
        </EmbedContainer>
      ) : (
        <HTMLWrapper
          as={tag}
          dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
          style={style}
        />
      )}
    </>
  );
};

HTML.defaultProps = {
  content: '',
  oembed: false,
  style: {},
  tag: 'div',
  theme: defaultStyles,
};

HTML.propTypes = {
  /**
   * Markup to render.
   */
  content: PropTypes.string,
  /**
   * Render oembeds.
   */
  oembed: PropTypes.bool,
  /**
   * CSS styles.
   */
  style: PropTypes.object,
  /**
   * Wrapping element.
   */
  tag: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

const themeMap = {
  default: defaultStyles,
  unstyled,
};

export default withThemes(themeMap)(HTML);
