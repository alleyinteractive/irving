/* eslint-disable react/no-danger */
import React from 'react';
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
    setCompanyFlyoutVisible,
    showFlyout,
  } = props;

  const flyout = findChildByName('list-50-item-flyout', children);
  const toggleFlyoutVisible = () => setCompanyFlyoutVisible(companyName);

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
        isVisible: showFlyout,
      })}
    </li>
  );
};

CompanyListItemRank.propTypes = {
  children: PropTypes.node.isRequired,
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  setCompanyFlyoutVisible: PropTypes.func.isRequired,
  showFlyout: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CompanyListItemRank);
