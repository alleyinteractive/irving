import React from 'react';
import PropTypes from 'prop-types';
import toReactElement from '@irvingjs/core/utils/toReactElement';
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
    style,
    theme,
  } = props;

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
    <SocialLinksWrapper style={style}>
      {items && 0 !== items.length && (
        <SocialLinksList>
          {items.map(({ platform, url, icon }) => (
            <SocialLinksItem key={platform}>
              <Link href={url}>
                <IconWrapper>
                  {icon.type.displayName ? icon : platform}
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
  platforms: [],
  style: {},
  theme: defaultStyles,
};

SocialLinks.propTypes = {
  /**
   * An object containing social platforms as keys as links to specific pages as values.
   */
  platforms: PropTypes.object,
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
  /**
   * Title of the shared content.
   */
};

const themeMap = {
  default: defaultStyles,
};

export {
  SocialLinks as Component,
  themeMap,
};

export default SocialLinks;
