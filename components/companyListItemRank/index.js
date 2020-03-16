/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './companyListItemRank.css';

const CompanyListItemRank = (props) => {
  const {
    companyName,
    rank,
  } = props;

  return (
    <li className={styles.wrapper}>
      <span className={styles.rankWrapper}>{rank}</span>
      <span className={styles.nameWrapper}>{companyName}</span>
    </li>
  );
};

CompanyListItemRank.propTypes = {
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default withStyles(styles)(CompanyListItemRank);
