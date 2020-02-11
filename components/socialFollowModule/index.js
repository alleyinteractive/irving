import React from 'react';
import PropTypes from 'prop-types';
import withThemes from 'components/hoc/withThemes';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
// Styles
import styles from './socialFollowModule.css';
import darkStyles from './darkTitle.css';
import lightStyles from './lightTitle.css';

const SocialFollowModule = ({ children, theme }) => (
  <div className={theme.wrapper}>
    <span className={theme.title}>
      {__('Follow', 'mittr')}
    </span>
    <ul className={styles.social}>
      { children }
    </ul>
  </div>
);

SocialFollowModule.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles, darkStyles, lightStyles);

const wrapWithThemes = withThemes('social-follow-module', {
  default: styles,
  dark: darkStyles,
  light: lightStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialFollowModule));
