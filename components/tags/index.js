import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './tags.css';

const Tags = ({ children }) => (
  <ul className={styles.wrapper}>
    {children}
  </ul>
);

Tags.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Tags);
