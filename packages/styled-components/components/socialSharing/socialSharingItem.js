import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import Email from '@material-ui/icons/Email';
import Facebook from '@material-ui/icons/Facebook';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Pinterest from '@material-ui/icons/Pinterest';
import Reddit from '@material-ui/icons/Reddit';
import Twitter from '@material-ui/icons/Twitter';
import WhatsApp from '@material-ui/icons/WhatsApp';
import Link from '../link';
import * as defaultStyles from './themes/default';

/**
 * Icons for supported platforms.
 *
 * @type {Array}
 */
const socialIconMap = {
  email: Email,
  facebook: Facebook,
  linkedin: LinkedIn,
  pinterest: Pinterest,
  reddit: Reddit,
  twitter: Twitter,
  whatsapp: WhatsApp,
};

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

  const IconComponent = (undefined !== socialIconMap[platform]) ?
    socialIconMap[platform] :
    null;

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
          <IconComponent title={platform} />
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
