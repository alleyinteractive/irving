import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
// Styles
import styles from './socialFollowModule.css';

const SocialFollowModule = ({ children }) => (
  <div className={styles.wrapper}>
    <span className={styles.title}>{__('Follow', 'mittr')}</span>
    <ul className={styles.social}>
      { children }
    </ul>
  </div>
);

SocialFollowModule.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(SocialFollowModule);
