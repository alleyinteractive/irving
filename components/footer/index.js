import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import styles from './footer.css';

/* eslint-disable */
const Footer = ({ data }) => (
  <footer className={styles.wrapper}>
    I am a fooooooooter {JSON.stringify(data)}
  </footer>
);

export default withStyles(styles)(Footer);
