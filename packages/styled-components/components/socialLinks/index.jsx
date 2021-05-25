import React from 'react';
import PropTypes from 'prop-types';
import toReactElement from '@irvingjs/core/utils/toReactElement';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import {
  analyticsPropTypes,
  getAnalyticsDefaultProps,
} from '@irvingjs/styled/types/analyticsPropTypes';
import Link from '../link';
import * as defaultStyles from './themes/default';

/**
 * Site-wide social links.
 *
 * Displays a list to social media platform pages.
 *
 * @tracking Fires when link is clicked.
 * - eventData {analytics.click} Label is platform.
 */
const SocialLinks = (props) => {
  const {
    analytics,
    platforms,
    theme,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    IconWrapper,
    SocialLinksItem,
    SocialLinksList,
    SocialLinksWrapper,
  } = theme;
  const items = Object.keys(platforms).map((platform) => ({
    platform,
    url: platforms[platform],
    icon: toReactElement({
      name: `irving/${platform}-icon`,
      config: {
        title: platform,
      },
      children: [],
    }),
  }));

  return (
    <SocialLinksWrapper {...standardProps}>
      {items && items.length !== 0 && (
        <SocialLinksList>
          {items.map(({ platform, url, icon }) => (
            <SocialLinksItem key={platform}>
              <Link
                analytics={({
                  click: {
                    ...analytics.click,
                    label: platform,
                  },
                })}
                href={url}
              >
                <IconWrapper className={platform}>
                  {icon}
                </IconWrapper>
              </Link>
            </SocialLinksItem>
          ))}
        </SocialLinksList>
      )}
    </SocialLinksWrapper>
  );
};

SocialLinks.defaultProps = {
  ...getAnalyticsDefaultProps(),
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  platforms: [],
};

SocialLinks.propTypes = {
  ...analyticsPropTypes,
  ...standardPropTypes,
  /**
   * An object containing social platforms as keys and links to specific pages as values.
   */
  platforms: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const themeMap = {
  default: defaultStyles,
};

export {
  SocialLinks as Component,
  themeMap,
};

export default SocialLinks;
