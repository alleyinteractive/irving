import React from 'react';
import PropTypes from 'prop-types';
import useClientNavigationOnClick from
  '@irvingjs/core/hooks/useClientNavigationOnClick';
import getTrackingService from '@irvingjs/services/trackingService';
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

const trackingService = getTrackingService();

/**
 * Link.
 *
 * Custom anchor.
 *
 * @todo Setup a default focus value for improved accessibility.
 */
const Link = (props) => {
  const {
    analytics,
    ariaHidden,
    children,
    href,
    onClick,
    rel,
    target,
    theme,
    tracking,
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
      {...props}
      {...standardProps}
      aria-hidden={'true' === ariaHidden ? ariaHidden : null}
      href={destination}
      onClick={(event) => {
        tracking.trackEvent({
          event: 'irving.linkClick',
          eventData: analytics.click,
        });
        return onClick ? onClick(event) : defaultOnClick(event);
      }}
      rel={rel}
      target={target}
    >
      {children}
    </LinkWrapper>
  );
};

Link.defaultProps = {
  ...getAnalyticsDefaultProps(),
  ...getStandardDefaultProps(),
  ariaHidden: null,
  theme: defaultStyles,
  rel: '',
  target: '',
};

Link.propTypes = {
  ...analyticsPropTypes,
  ...standardPropTypes,
  ariaHidden: PropTypes.oneOf([null, 'true']),
  /**
   * Destination for anchor tag (`href` attribute)
   */
  href: PropTypes.string.isRequired,
  /**
   * OnClick function. NOTE: if provided, this will override
   * history push handling, so use with care.
   */
  onClick: PropTypes.func,
  /**
   * Rel attribute.
   */
  rel: PropTypes.string,
  /**
   * Anchor target.
   */
  target: PropTypes.string,
  /**
   * React tracking.
   */
  tracking: trackingService.TrackingPropType,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Link as Component,
  themeMap,
};

export default trackingService.track({
  eventComponent: 'link',
})(Link);
