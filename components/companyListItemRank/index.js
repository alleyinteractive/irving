/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Button from 'components/helpers/button';
import styles from './companyListItemRank.css';

const CompanyListItemRank = (props) => {
  const {
    children,
    companyName,
    rank,
  } = props;

  const [flyoutVisible, setFlyoutVisible] = useState(false);
  const toggleFlyoutVisible = () => setFlyoutVisible(! flyoutVisible);

  const flyout = findChildByName('list-50-item-flyout', children);
  return (
    <li className={styles.wrapper}>
      <span className={styles.rankWrapper}>{rank}</span>
      <Button
        className={styles.nameWrapper}
        onClick={toggleFlyoutVisible}
      >
        {companyName}
      </Button>
      {React.cloneElement(flyout, {
        isVisible: flyoutVisible,
      })}
    </li>
  );
};

CompanyListItemRank.propTypes = {
  children: PropTypes.node.isRequired,
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default withStyles(styles)(CompanyListItemRank);
