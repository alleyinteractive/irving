import React from 'react';
import PropTypes from 'prop-types';
import toReactElement from '@irvingjs/core/utils/toReactElement';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import Link from '../link';
import * as defaultStyles from './themes/default';

/**
 * Site-wide social links.
 *
 * Displays a list to social media platform pages.
 */
const SocialLinks = (props) => {
  const {
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
      {items && 0 !== items.length && (
        <SocialLinksList>
          {items.map(({ platform, url, icon }) => (
            <SocialLinksItem key={platform}>
              <Link
                data-gtm-action="Follow"
                data-gtm-category="Engagement"
                data-gtm-label={platform}
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
  ...standardDefaultProps,
  theme: defaultStyles,
  platforms: [],
};

SocialLinks.propTypes = {
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
