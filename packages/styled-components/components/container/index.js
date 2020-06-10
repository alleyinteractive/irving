import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';

const widths = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

/**
 * Render children in a React fragment or any other HTML tag.
 *
 * @todo Is there a better way to handle the maxWidth and background image
 *       functionality? We want this functionality to be independent from
 *       themes.
 */
const Container = (props) => {
  const {
    children,
    backgroundImageUrl,
    maxWidth,
    style,
    tag,
    theme,
  } = props;

  const { ContainerWrapper } = theme;

  // Setup a max-width style.
  if ('string' === typeof maxWidth) {
    style.maxWidth = `${widths[maxWidth]}px`;
  } else if ('number' === typeof maxWidth) {
    style.maxWidth = `${maxWidth}px`;
  }

  // Setup a background image.
  if ('' !== backgroundImageUrl) {
    style.backgroundImage = `url(${backgroundImageUrl})`;
    style.backgroundRepeat = 'no-repeat';
    style.backgroundSize = 'cover';
  }

  return (
    <ContainerWrapper as={tag} style={style}>
      {children}
    </ContainerWrapper>
  );
};

Container.defaultProps = {
  children: {},
  backgroundImageUrl: '',
  maxWidth: 'lg',
  style: {},
  tag: 'div',
  theme: defaultStyles,
};

Container.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
  /**
   * Image URL to use as a background.
   */
  backgroundImageUrl: PropTypes.string,
  /**
   * Max width of the container.
   */
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * CSS styles.
   */
  style: PropTypes.object,
  /**
   * Tag used to render.
   */
  tag: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

const themeMap = {
  default: defaultStyles,
};

export default withThemes(themeMap)(Container);
