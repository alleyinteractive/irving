import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import Link from '../link';
import * as defaultStyles from './themes/default';

const SocialSharingItem = (props) => {
  const {
    platform,
    theme,
    url,
  } = props;

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
          <p>{platform} (CORE ICON TODO)</p>
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
