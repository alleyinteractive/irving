import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';
import { withStyles } from 'critical-style-loader/lib';
import Logo from 'assets/icons/horizontal-logo-v2--white.svg';
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
              <Logo />
              <span className={styles.titleText}>
                {__('MIT Technology Review', 'mittr')}
              </span>
            </h2>
            <p className={styles.missionStatement}>{missionStatement}</p>
          </div>
          <div className={styles.icon} aria-hidden="true" />
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
