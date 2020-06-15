import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import {
  Email,
  Facebook,
  LinkedIn,
  Pinterest,
  Reddit,
  Twitter,
  WhatsApp,
} from '@material-ui/icons';
import Link from '../../../common/link';
import * as defaultStyles from './themes/default';

const socialIconMap = {
  email: Email,
  facebook: Facebook,
  linkedin: LinkedIn,
  pinterest: Pinterest,
  reddit: Reddit,
  twitter: Twitter,
  whatsapp: WhatsApp,
};

const SocialSharingItem = (props) => {
  const {
    platform,
    theme,
    url,
  } = props;
  const IconComponent = socialIconMap[platform];

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
          <IconComponent
            title={platform}
          />
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
