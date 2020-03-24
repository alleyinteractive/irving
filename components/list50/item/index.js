import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Button from 'components/helpers/button';
import styles from './list50Item.css';

const List50Item = (props) => {
  const {
    children,
    companyName,
    componentName,
    location,
    rank,
    setCompanyFlyoutVisible,
    showFlyout,
    yearsOnList,
  } = props;

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
        className={styles.nameWrapper}
      >
        {'list-50-rank-item' === componentName &&
          <span className={styles.rank}>{rank}</span>
        }
        { yearsOnList && (
          <span className={styles.years}>
            {yearsOnList} {__('years', 'mittr')}
          </span>
        )}
        { location && <span className={styles.location}>{location}</span> }
        <Button
          className={styles.name}
          onClick={toggleFlyoutVisible}
        >
          {companyName}
        </Button>
        {'list-50-rank-item' !== componentName && (
          <span className={classNames(styles.rank, styles.rankSmall)}>
            {rank}
          </span>
        )}
      </div>
      {React.cloneElement(flyout, {
        isVisible: showFlyout,
      })}
    </li>
  );
};

List50Item.defaultProps = {
  location: '',
  yearsOnList: '',
};

List50Item.propTypes = {
  children: PropTypes.node.isRequired,
  companyName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  location: PropTypes.string,
  rank: PropTypes.number.isRequired,
  setCompanyFlyoutVisible: PropTypes.func.isRequired,
  showFlyout: PropTypes.bool.isRequired,
  yearsOnList: PropTypes.string,
};

export default withStyles(styles)(List50Item);
