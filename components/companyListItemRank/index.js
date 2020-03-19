/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import styles from './companyListItemRank.css';

const CompanyListItemRank = (props) => {
  const {
    children,
    companyName,
    rank,
  } = props;

  const flyout = findChildByName('list-50-item-flyout', children);
  return (
    <li className={styles.wrapper}>
      <span className={styles.rankWrapper}>{rank}</span>
      <span className={styles.nameWrapper}>{companyName}</span>
      {flyout}
    </li>
  );
};

CompanyListItemRank.propTypes = {
  children: PropTypes.node.isRequired,
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default withStyles(styles)(CompanyListItemRank);
