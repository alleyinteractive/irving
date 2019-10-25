import React from 'react';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';

// Styles
import PropTypes from 'prop-types';
import styles from './order.css';

const Order = ({ order: { item, orderDate, downloadLink }, lastItem }) => (
  <div className={(lastItem) ? styles.ordersWrapNB : styles.ordersWrap}>
    <Link to={downloadLink} className={styles.downloadLink}>
      {__('Download', 'mittr')}
      <span className="screen-reader-text">{item}</span>
    </Link>
    {item} <br />
    {orderDate} <br />
  </div>
);

Order.propTypes = {
  order: PropTypes.shape({
    item: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    downloadLink: PropTypes.string.isRequired,
  }).isRequired,
  lastItem: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Order);
