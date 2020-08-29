import React from 'react';
import PropTypes from 'prop-types';
import useClientNavigationOnClick from
  '@irvingjs/core/hooks/useClientNavigationOnClick';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

/**
 * Link.
 *
 * Custom anchor.
 *
 * @todo Setup a default focus value for improved accessibility.
 */
const Link = (props) => {
  const {
    children,
    href,
    onClick,
    rel,
    target,
    theme,
  } = props;
  const {
    onClick: defaultOnClick,
    destination,
  } = useClientNavigationOnClick(href);
  const {
    LinkWrapper,
  } = theme;
  const standardProps = useStandardProps(props);

  return (
    <LinkWrapper
      href={destination}
      onClick={onClick || defaultOnClick}
      rel={rel}
      target={target}
      {...standardProps}
    >
      {children}
    </LinkWrapper>
  );
};

Link.defaultProps = {
  ...standardDefaultProps,
  theme: defaultStyles,
  onClick: false,
  rel: '',
  target: '',
};

Link.propTypes = {
  ...standardPropTypes,
  /**
   * Destination for anchor tag (`href` attribute)
   */
  href: PropTypes.string.isRequired,
  /**
   * OnClick function. NOTE: if provided, this will override
   * history push handling, so use with care.
   */
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  /**
   * Rel attribute.
   */
  rel: PropTypes.string,
  /**
   * Anchor target.
   */
  target: PropTypes.string,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Link as Component,
  themeMap,
};

export default Link;
