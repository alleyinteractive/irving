import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/helpers/link';
import FacebookIcon from 'assets/icons/facebook.svg';
import TwitterIcon from 'assets/icons/twitter.svg';
import LinkedInIcon from 'assets/icons/linkedin.svg';
import WhatsAppIcon from 'assets/icons/whatsapp.svg';
import PinterestIcon from 'assets/icons/pinterest.svg';
import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import styles from './socialItem.css';

const socialIconMap = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
  pinterest: PinterestIcon,
};

const SocialItem = (props) => {
  const {
    type,
    url,
    displayIcon,
    theme,
  } = props;
  const IconComponent = socialIconMap[type];

  return (
    <li className={theme.wrapper}>
      <Link to={url} className={theme.link}>
        {displayIcon && <IconComponent />}
      </Link>
    </li>
  );
};

SocialItem.propTypes = {
  /**
   * What type of service is this? Should correspond to a key in `socialIconMap`
   */
  type: PropTypes.string.isRequired,
  /**
   * Where should this icon take the user?
   */
  url: PropTypes.string.isRequired,
  /**
   * Should the social icon be displayed, or just text?
   */
  displayIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  /**
   * Alternate theme for this component.
   */
  theme: PropTypes.object.isRequired,
};


const wrapWithThemes = withThemes('SocialItem', { default: styles });
export const themeSocialItem = createWithUserThemes(SocialItem, styles);

export default wrapWithThemes(SocialItem);
