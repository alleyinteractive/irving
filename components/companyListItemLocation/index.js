import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './companyListItemLocation.css';

const CompanyListItemLocation = (props) => {
  const {
    location,
    companyName,
    rank,
  } = props;

  return (
    <li className={styles.wrapper}>
      <span className={styles.location}>{location}</span>
      <span className={styles.name}>{companyName}</span>
      <span className={styles.rank}>{rank}</span>
    </li>
  );
};

CompanyListItemLocation.propTypes = {
  location: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default withStyles(styles)(CompanyListItemLocation);
