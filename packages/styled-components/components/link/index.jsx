/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading, consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import useClientNavigationOnClick from
  '@irvingjs/core/hooks/useClientNavigationOnClick';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import {
  analyticsPropTypes,
  getAnalyticsDefaultProps,
} from '@irvingjs/styled/types/analyticsPropTypes';
import getTrackingService from '@irvingjs/services/trackingService';
import * as defaultStyles from './themes/default';

const trackingService = getTrackingService();

/**
 * Link.
 *
 * Custom anchor.
 *
 * @todo Setup a default focus value for improved accessibility.
 *
 * @tracking Fires when link is clicked.
 * - event          irving.linkClick
 * - eventComponent link
 * - eventData      {analytics.click}
 *
 */
const Link = (props) => {
  const {
    analytics,
    children,
    href,
    onClick,
    rel,
    target,
    theme,
    tabIndex,
  } = props;
  const {
    onClick: defaultOnClick,
    destination,
  } = useClientNavigationOnClick(href);
  const tracking = trackingService.useTracking();
  const {
    LinkWrapper,
  } = theme;
  const standardProps = useStandardProps(props);

  const handleClick = (event) => {
    tracking.trackEvent({
      component: 'link',
      event: 'irving.linkClick',
      eventData: analytics.click,
    });

    // Allow the user to open the link in a new tab
    if (
      event.ctrlKey
      || event.shiftKey
      || event.metaKey
      || (event.button && event.button === 1)
    ) {
      return;
    }

    return onClick ? onClick(event) : defaultOnClick(event);
  };

  const ariaProps = Object.keys(props).reduce((acc, propName) => {
    if (!propName.startsWith('aria')) {
      return acc;
    }

    // Convert aria values to kebab case as camelCase aria attributes do not work.
    const kebabAria = `aria-${propName.replace('aria', '').toLocaleLowerCase()}`;

    return {
      ...acc,
      [kebabAria]: props[propName],
    };
  }, {});

  return (
    <LinkWrapper
      {...standardProps}
      {...ariaProps}
      href={destination}
      onClick={handleClick}
      rel={rel}
      target={target}
      tabIndex={tabIndex}
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
  ariaHidden: PropTypes.oneOfType([
    PropTypes.oneOf([null, 'true']),
    PropTypes.bool,
  ]),
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
};

const themeMap = {
  default: defaultStyles,
};

export {
  Link as Component,
  themeMap,
};

export default Link;
