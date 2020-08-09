import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useClientNavigationOnClick from
  '@irvingjs/core/hooks/useClientNavigationOnClick';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
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
    className,
    href,
    onClick,
    rel,
    style,
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

  const cookies = useSelector((state) => state.route.cookie);
  console.log(cookies);

  return (
    <LinkWrapper
      className={className}
      href={destination}
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
  className: '',
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
   * Class name.
   */
  className: PropTypes.string,
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
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Anchor target.
   */
  target: PropTypes.string,
  /**
   * Theme for the component.
   */
  theme: PropTypes.object,
};

export const themeMap = {
  default: defaultStyles,
};

export { Link as PureComponent };

export const StyledComponent = withThemes(themeMap)(Link);

export default StyledComponent;
