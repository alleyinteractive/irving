import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import styles from './footer.css';

const Footer = ({ children, copyrightLink, missionStatement }) => {
  const menu = findChildByName('menu', children);
  return (
    <footer className={styles.container} aria-labelledby="footer">
      <div className={styles.wrapper}>
        <h2 id="footer" className={styles.title}>
          {__('MIT Technology Review', 'mittr')}
        </h2>
        <div className={styles.missionStatement}>{missionStatement}</div>
        <Link to="/editions/" className={styles.editionsLink}>
          {__('Browse international editions', 'mittr')}
        </Link>
        <div className={styles.menu}>{menu}</div>
        <div className={styles.copyright}>
          <a href={copyrightLink}>MIT Technology Review © 2019</a>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  missionStatement: PropTypes.string.isRequired,
  copyrightLink: PropTypes.string.isRequired,
};

export default withStyles(styles)(Footer);
