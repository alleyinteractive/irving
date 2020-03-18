/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './companyListItemName.css';

const CompanyListItemName = (props) => {
  const {
    companyName,
    rank,
  } = props;

  return (
    <li className={styles.wrapper}>
      <span className={styles.nameWrapper}>{companyName}</span>
      <span className={styles.rankWrapper}>{rank}</span>
    </li>
  );
};

CompanyListItemName.propTypes = {
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default withStyles(styles)(CompanyListItemName);
