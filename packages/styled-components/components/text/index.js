import React from 'react';
// import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import EmbedContainer from 'react-oembed-container';
import { richText } from '@irvingjs/core/config/html';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';
import * as htmlStyles from './themes/html';
import * as responsiveEmbedStyles from './themes/responsiveEmbed';
import * as unstyledStyles from './themes/unstyled';
import * as captionStyles from './themes/caption';
import * as h1Styles from './themes/h1';
import * as h2Styles from './themes/h2';
import * as h3Styles from './themes/h3';
import * as h4Styles from './themes/h4';
import * as h5Styles from './themes/h5';
import * as h6Styles from './themes/h6';
// import {
//   SiteThemeContext,
// } from '../../../styled/components/site-theme-provider';

/**
 * Output text.
 */
const Text = (props) => {
  const {
    className,
    content,
    html,
    oembed,
    style,
    tag,
    theme = defaultStyles,
  } = props;

  const { TextWrapper } = theme;

  // const {
  //   theme: SiteTheme,
  // } = useContext(SiteThemeContext);

  // console.log(SiteTheme.colors.primary);

  switch (true) {
    case ! content.length:
      return false;

    case true === oembed:
      return (
        <EmbedContainer markup={content}>
          <TextWrapper
            as={tag}
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content, richText) }} // eslint-disable-line react/no-danger, max-len
            style={style}
          />
        </EmbedContainer>
      );

    case true === html:
      return (
        <TextWrapper
          as={tag}
          className={className}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content, richText) }} // eslint-disable-line react/no-danger
          style={style}
        />
      );

    default:
      return (
        <TextWrapper
          as={tag}
          className={className}
          style={style}
        >
          {content}
        </TextWrapper>
      );
  }
};

Text.defaultProps = {
  className: '',
  content: '',
  html: false,
  oembed: false,
  style: {},
  tag: 'div',
  theme: defaultStyles,
};

Text.propTypes = {
  /**
   * Class name.
   */
  className: PropTypes.string,
  /**
   * Markup to render.
   */
  content: PropTypes.string,
  /**
   * Render as HTML.
   */
  html: PropTypes.bool,
  /**
   * Render oembeds.
   */
  oembed: PropTypes.bool,
  /**
   * CSS styles.
   */
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Wrapping element.
   */
  tag: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

export const themeMap = {
  default: defaultStyles,
  html: htmlStyles,
  responsiveEmbed: responsiveEmbedStyles,
  unstyled: unstyledStyles,
  caption: captionStyles,
  h1: h1Styles,
  h2: h2Styles,
  h3: h3Styles,
  h4: h4Styles,
  h5: h5Styles,
  h6: h6Styles,
};

export { Text as PureComponent };

export const StyledComponent = withThemes(themeMap)(Text);

export default StyledComponent;
