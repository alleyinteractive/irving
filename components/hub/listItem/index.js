import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
// import { findChildByName } from 'utils/children';
// import Link from 'components/helpers/link';
// Styles
import styles from './hubListItem.css';

const HubListItem = ({
  children,
}) => {
  console.log('fuu eslint');
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

HubListItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(HubListItem);
