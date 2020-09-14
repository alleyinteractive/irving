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
    gtmAction,
    gtmCategory,
    gtmLabel,
    gtmValue,
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
      data-gtm-action={gtmAction}
      data-gtm-category={gtmCategory}
      data-gtm-label={gtmLabel}
      data-gtm-value={gtmValue}
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
  gtmCategory: '',
  gtmAction: '',
  gtmLabel: '',
  gtmValue: null,
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
  /**
   * GTM category.
   */
  gtmCategory: PropTypes.string,
  /**
   * GTM action.
   */
  gtmAction: PropTypes.string,
  /**
   * GTM label.
   */
  gtmLabel: PropTypes.string,
  /**
   * GTM value.
   */
  gtmValue: PropTypes.number,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Link as Component,
  themeMap,
};

export default Link;
