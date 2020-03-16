import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import {
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';

// Styles
import styles from './register.css';

const Activate = ({
  children,
  isAuthenticated,
}) => (
  <div className={styles.wrapper}>
      Is Authenticated? {isAuthenticated}
    {children}
  </div>
);

Activate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const withRedux = connect(
  (state) => ({
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  () => ({})
);

export default withRedux(
  withStyles(styles)(Activate)
);
