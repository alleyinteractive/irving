import React from 'react';
import { withStyles } from 'critical-style-loader/lib';

import styles from './footer.css';

const Footer = () => (
  <footer className={styles.wrapper}>
    <p>This is your site footer</p>
  </footer>
);

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Footer);
