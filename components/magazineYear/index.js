import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './magazineYear.css';

const MagazineYear = ({ title }) => (
  <div className={styles.card}>
    <span>{title}</span>
  </div>
);

MagazineYear.propTypes = {
  title: PropTypes.number.isRequired,
};

export default withStyles(styles)(MagazineYear);
