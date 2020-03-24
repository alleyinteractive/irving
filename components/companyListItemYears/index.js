import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import styles from './companyListItemYears.css';

const CompanyListItemYears = (props) => {
  const {
    yearsOnList,
    companyName,
    rank,
  } = props;

  return (
    <li className={styles.wrapper}>
      <span className={styles.years}>{yearsOnList} {__('years', 'mittr')}</span>
      <span className={styles.name}>{companyName}</span>
      <span className={styles.rank}>{rank}</span>
    </li>
  );
};

CompanyListItemYears.propTypes = {
  yearsOnList: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default withStyles(styles)(CompanyListItemYears);
