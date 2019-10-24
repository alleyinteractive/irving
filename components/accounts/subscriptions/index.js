import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
// Styles
import styles from './subscriptions.css';

const Subscriptions = ({
  type,
  expiration,
}) => (
  <div className={styles.subscriptionWrap}>
    {/* eslint-disable-next-line max-len */}
    <h3 className={styles.heading}>{__('Current subscriptions', 'mittr')}</h3>
    {type}<br />
Expires { expiration }
  </div>
);

Subscriptions.propTypes = {
  type: PropTypes.string.isRequired,
  expiration: PropTypes.string.isRequired,
};
export default withStyles(styles)(Subscriptions);
