import React from 'react';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { format } from 'date-fns';

// Styles
import PropTypes from 'prop-types';
import styles from './order.css';

const Order = ({ order: { type, created, downloadLink }, lastItem }) => (
  <div className={(lastItem) ? styles.ordersWrapNB : styles.ordersWrap}>
    {downloadLink && (
      <Link to={downloadLink} className={styles.downloadLink}>
        {__('Download', 'mittr')}
        <span className="screen-reader-text">{type}</span>
      </Link>
    )}
    MIT Technology Review: {type}<br />
    {format(
      new Date(Date.parse(created)),
      'MMMM dd, yyyy'
    )} <br />
  </div>
);

Order.propTypes = {
  order: PropTypes.shape({
    type: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    downloadLink: PropTypes.string,
  }).isRequired,
  lastItem: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Order);
