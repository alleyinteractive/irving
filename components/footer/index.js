import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import styles from './footer.css';

const Footer = ({
  children,
  copyrightLink,
  missionStatement,
  themeName,
}) => {
  const menu = findChildByName('menu', children);
  const date = new Date();
  return (
    <footer className={styles.container} aria-labelledby="footer">
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.intro}>
            <h2 id="footer" className={styles.title}>
              {__('MIT Technology Review', 'mittr')}
            </h2>
            <p className={styles.missionStatement}>{missionStatement}</p>
          </div>
          <div className={styles.icon} aria-hidden="true" />
          <Link to="/editions/" className={styles.editionsLink}>
            <span>Browse</span>
            <span>International</span>
            <span>Editions</span>
          </Link>
        </header>
        {'simpleFooter' !== themeName && (
          <div className={styles.menu}>{menu}</div>
        )}
        <div className={styles.copyright}>
          <a href={copyrightLink}>
            MIT Technology Review © {date.getFullYear()}
          </a>
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  themeName: '',
};

Footer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  missionStatement: PropTypes.string.isRequired,
  copyrightLink: PropTypes.string.isRequired,
  themeName: PropTypes.string,
};

export default withStyles(styles)(Footer);
