import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/link';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
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
    theme,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    LogoWrapper,
    LogoLink,
    LogoImage,
    SiteName,
  } = theme;
  const hasChildren = children && children.length;

  return (
    <LogoWrapper {...standardProps}>
      <LogoLink
        as={Link}
        gtmAction="Homepage"
        gtmCategory="Navigation"
        gtmLabel="Logo"
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
  ...standardDefaultProps,
  theme: defaultStyles,
  href: '/',
  logoImageUrl: '',
  siteName: '',
};

Logo.propTypes = {
  ...standardPropTypes,
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
};

const themeMap = {
  default: defaultStyles,
};

export {
  Logo as Component,
  themeMap,
};

export default Logo;
