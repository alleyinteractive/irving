import React from 'react';
import PropTypes from 'prop-types';
import parseUrl from '@irvingjs/core/utils/getRelativeUrl';
import history from '@irvingjs/core/utils/history';
import withThemes from 'components/hoc/withThemes';
import * as defaultStyles from './themes/default';

/**
 * Link.
 *
 * Custom anchor.
 */
const Link = (props) => {
  const {
    children,
    href,
    onClick,
    rel,
    style,
    target,
    theme,
  } = props;

  // If our destination is a relative url, manage navigation using push state.
  const relativeUrl = parseUrl(href);
  const defaultOnClick = (event) => {
    if (relativeUrl) {
      event.preventDefault();
      history.push(relativeUrl);
    }
  };

  const {
    LinkWrapper,
  } = theme;

  return (
    <LinkWrapper
      href={relativeUrl || href}
      onClick={onClick || defaultOnClick}
      rel={rel}
      style={style}
      target={target}
    >
      {children}
    </LinkWrapper>
  );
};

Link.defaultProps = {
  onClick: false,
  rel: '',
  style: {},
  target: '',
  theme: defaultStyles,
};

Link.propTypes = {
  /**
   * Child nodes
   */
  children: PropTypes.node.isRequired,
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
   * CSS styles.
   */
  style: PropTypes.object,
  /**
   * Anchor target.
   */
  target: PropTypes.string,
  /**
   * Theme for the component.
   */
  theme: PropTypes.object,
};

const themeMap = {
  default: defaultStyles,
};

export default withThemes(themeMap)(Link);
