import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import styles from './footer.css';

const Footer = () => (
  <footer className={styles.wrapper}>
    I am a fooooooooter
  </footer>
);

export default withStyles(styles)(Footer);
