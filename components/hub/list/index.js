import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
// import { findChildByName } from 'utils/children';
// import Link from 'components/helpers/link';
// Styles
import styles from './hubList.css';

const HubList = ({
  children,
}) => {
  console.log('fuu eslint');
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

HubList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(HubList);
