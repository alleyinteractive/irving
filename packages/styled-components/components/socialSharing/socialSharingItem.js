import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import toReactElement from '@irvingjs/core/utils/toReactElement';
import Link from '../link';
import * as defaultStyles from './themes/default';

/**
 * A single social sharing item.
 *
 * @todo Refactor into a single component file if possible.
 * @todo Update how Icons are used once we have a better solution. Material UI
 *       dependency is temporary.
 */
const SocialSharingItem = (props) => {
  const {
    platform,
    theme,
    url,
  } = props;

  // Build the icon.
  const Icon = toReactElement({
    name: `irving/${platform}-icon`,
    config: {
      title: `Share on ${platform}`,
    },
    children: [],
  });

  const {
    IconWrapper,
    SocialSharingItemWrapper,
  } = theme;

  return (
    <SocialSharingItemWrapper>
      <Link
        href={url}
      >
        <IconWrapper>
          {Icon.type.displayName ? Icon : platform}
        </IconWrapper>
      </Link>
    </SocialSharingItemWrapper>
  );
};

SocialSharingItem.defaultProps = {
  url: '',
};

SocialSharingItem.propTypes = {
  /**
   * Social sharing platform for the item.
   */
  platform: PropTypes.string.isRequired,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object.isRequired,
  /**
   * Where should this icon take the user?
   */
  url: PropTypes.string,
};

const socialSharingItemThemeMap = {
  default: defaultStyles,
};

export default withThemes(socialSharingItemThemeMap)(SocialSharingItem);
