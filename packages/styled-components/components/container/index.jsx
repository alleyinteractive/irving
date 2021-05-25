/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
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
    theme,
    style,
  } = props;
  const { ContainerWrapper } = theme;

  if (children.length === 0) {
    return false;
  }

  // Setup a max-width style.
  if (
    typeof maxWidth === 'string'
    && undefined !== widths[maxWidth]
    && maxWidth.length !== 0
  ) {
    style.maxWidth = `${widths[maxWidth]}px`; // Use one of our predefined sizes.
  } else if (typeof maxWidth === 'string' && maxWidth.length !== 0) {
    style.maxWidth = maxWidth; // Use the string value 1:1.
  } else if (typeof maxWidth === 'number') {
    style.maxWidth = `${maxWidth}px`; // Use the interger value as pixels.
  }

  // Setup a background image.
  if (backgroundImageUrl !== '') {
    style.backgroundImage = `url(${backgroundImageUrl})`;
    style.backgroundRepeat = 'no-repeat';
    style.backgroundSize = 'cover';
  }

  const standardProps = useStandardProps(props, {
    style,
  });

  return (
    <ContainerWrapper {...standardProps}>
      {children}
    </ContainerWrapper>
  );
};

Container.defaultProps = {
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  backgroundImageUrl: '',
  maxWidth: 'lg',
};

Container.propTypes = {
  ...standardPropTypes,
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
};

const themeMap = {
  default: defaultStyles,
};

export {
  Container as Component,
  themeMap,
};

export default Container;
