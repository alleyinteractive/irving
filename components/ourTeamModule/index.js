import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './ourTeamModule.css';

const OurTeamModule = ({ children }) => (
  <div className={styles.moduleWrapper}>
    <span className={styles.sidebarTitle}>{__('Our Team', 'mittr')}</span>
    <ul className={styles.teamList}>
      {children}
    </ul>
    <Link to="/about" className={styles.link}>
      {__('More about us', 'mittr')} &#62;
    </Link>
  </div>
);

OurTeamModule.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(OurTeamModule);
