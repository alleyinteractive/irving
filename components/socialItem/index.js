/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import FacebookIcon from 'assets/icons/facebook.svg';
import LinkedInIcon from 'assets/icons/linkedin.svg';
import TwitterIcon from 'assets/icons/twitter.svg';
import WhatsAppIcon from 'assets/icons/whatsapp.svg';
import styles from './socialItem.css';

const socialIconMap = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsAppIcon,
};

const SocialItem = ({ type, url, displayIcon }) => {
  const IconComponent = socialIconMap[type];

  return (
    <li className={styles.wrapper}>
      <Link to={url} className={styles.link}>
        {displayIcon && IconComponent && <IconComponent />}
        {type}
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
  displayIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(SocialItem);
