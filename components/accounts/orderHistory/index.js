import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Order from '../order';
import Subscriptions from '../subscriptions';

// Styles
import styles from './orderHistory.css';

const OrderHistory = () => {
  // The orders variable is dummy data and should be replaced with data from the API.
  const orders = [
    {
      item: 'MIT Technology Review: November/December 2016',
      orderDate: 'October 26, 2016',
      downloadLink: '#',
    },
    {
      item: 'MIT Technology Review: November/December 2016',
      orderDate: 'January 9, 2017',
      downloadLink: '#',
    },
    {
      item: 'MIT Technology Review: July/August 2017',
      orderDate: 'July 24, 2017',
      downloadLink: '#',
    },
    {
      item: 'MIT Technology Review: July/August 2018',
      orderDate: 'July 12, 2018',
      downloadLink: '#',
    },
    {
      item: 'MIT Technology Review: November/December 2018',
      orderDate: 'December 4, 2018',
      downloadLink: '#',
    },
  ];
  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>
        {__('Account', 'mittr')}
      </h1>
      <h2 className={styles.accountSubHeader}>
        {__('Review your order history', 'mittr')}
      </h2>
      <Subscriptions
        type="Print + All Access Digital"
        expiration="November 21, 2020"
      />
      <h3 className={styles.heading} id="orders-downloads'>{__('Orders and downloads', 'mittr')}</h3>
<ul aria-labelledby="orders-downloads">
      { orders.map((order, i) => (<li>
        <Order
          order={order}
          lastItem={(orders.length - 1 === i)}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(OrderHistory);
