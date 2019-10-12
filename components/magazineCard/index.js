import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './magazineCard.css';

const MagazineCard = ({ title }) => (
  <div className={styles.card}>
    <span>{title}</span>
  </div>
);

MagazineCard.propTypes = {
  title: PropTypes.number.isRequired,
};

export default withStyles(styles)(MagazineCard);
