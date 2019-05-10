import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import withData from 'components/hoc/withData';
import styles from './footer.css';

/* eslint-disable */
const Footer = ({ data }) => (
  <footer className={styles.wrapper}>
    I am a fooooooooter {JSON.stringify(data)}
  </footer>
);

export default withData('footer', {
  endpoint: 'https://jsonplaceholder.typicode.com/todos/1',
})(withStyles(styles)(Footer));
