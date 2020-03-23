import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Button from 'components/helpers/button';
import styles from './companyListItemLocation.css';

const CompanyListItemLocation = (props) => {
  const {
    // bgColor @todo we need this passed in
    children,
    location,
    companyName,
    rank,
    setCompanyFlyoutVisible,
    showFlyout,
  } = props;

  const bgColor = '#fff';

  const flyout = findChildByName('list-50-item-flyout', children);
  const toggleFlyoutVisible = () => setCompanyFlyoutVisible(companyName);

  return (
    <li
      className={classNames(
        styles.wrapper,
        { [styles.flyoutVisible]: showFlyout },
      )}
    >
      <div
        style={{ backgroundColor: bgColor }}
        className={styles.nameWrapper}
      >
        <span className={styles.location}>{location}</span>
        <Button
          className={styles.name}
          onClick={toggleFlyoutVisible}
        >
          <span
            className={styles.nameInner}
          >
            {companyName}
          </span>
        </Button>
        <span className={styles.rank}>{rank}</span>
      </div>
      {React.cloneElement(flyout, {
        isVisible: showFlyout,
        bgColor,
      })}
    </li>
  );
};

CompanyListItemLocation.propTypes = {
  // bgColor: PropTypes.string.isRequired @todo we need this passed in
  children: PropTypes.node.isRequired,
  location: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  setCompanyFlyoutVisible: PropTypes.func.isRequired,
  showFlyout: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CompanyListItemLocation);
