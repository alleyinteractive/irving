import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/link';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import {
  analyticsPropTypes,
  getAnalyticsDefaultProps,
} from '@irvingjs/styled/types/analyticsPropTypes';
import * as defaultStyles from './themes/default';

/**
 * Logo.
 *
 * Display the site name or logo.
 *
 * @todo Update with a proper image component.
 *
 * @tracking Fires when link is clicked.
 * - eventData {analytics.click}
 */
const Logo = (props) => {
  const {
    analytics,
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
        analytics={analytics}
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
  ...getAnalyticsDefaultProps(),
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  href: '/',
  logoImageUrl: '',
  siteName: '',
};

Logo.propTypes = {
  ...analyticsPropTypes,
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
