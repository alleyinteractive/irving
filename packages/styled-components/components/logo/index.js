import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
import Link from 'components/link';
import * as defaultStyles from './themes/default';

/**
 * Logo.
 *
 * Display the site name or logo.
 *
 * @todo Update with a proper image component.
 */
const Logo = (props) => {
  const {
    href,
    logoImageUrl,
    children,
    siteName,
    style,
    theme,
  } = props;

  const {
    LogoWrapper,
    LogoLink,
    LogoImage,
    SiteName,
  } = theme;
  const hasChildren = children && children.length;

  return (
    <LogoWrapper style={style}>
      <LogoLink
        as={Link}
        href={href}
      >
        {(logoImageUrl && ! hasChildren) ? (
          <LogoImage>
            <img src={logoImageUrl} alt={siteName} />
          </LogoImage>
        ) : children}
        <SiteName
          screenreaderOnly={logoImageUrl || hasChildren}
        >
          {siteName}
        </SiteName>
      </LogoLink>
    </LogoWrapper>
  );
};

Logo.defaultProps = {
  children: [],
  href: '/',
  logoImageUrl: '',
  siteName: '',
  style: {},
  theme: defaultStyles,
};

Logo.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
  /**
   * URL the logo should link to.
   */
  href: PropTypes.string,
  /**
   * URL of the image.
   */
  logoImageUrl: PropTypes.string,
  /**
   * Site name.
   */
  siteName: PropTypes.string,
  /**
   * CSS styles.
   */
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

export const themeMap = {
  default: defaultStyles,
};

export { Logo as PureComponent };

export const StyledComponent = withThemes(themeMap)(Logo);

export default StyledComponent;
