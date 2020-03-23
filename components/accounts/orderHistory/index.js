import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import {
  getAccount,
  getProfile,
} from 'selectors/zephrSelector';
import { format } from 'date-fns';
import history from 'utils/history';
import classNames from 'classnames';
import Order from '../order';
import Subscriptions from '../subscriptions';

// Styles
import styles from './orderHistory.css';

const OrderHistory = ({ account, isAuthenticated }) => {
  // Prevent unauthenticated users from being able to visit this route.
  if (! isAuthenticated) {
    history.push('/');
  }

  const {
    orders = [],
    subscriptionActive = false,
    subscriptionExpiration,
    subscriptionType,
  } = account;

  const [expirationDate, formatDate] = useState('');
  const [ordersArr, setOrdersArr] = useState([]);
  useEffect(() => {
    if (subscriptionExpiration && '' === expirationDate) {
      const date = format(
        new Date(Date.parse(subscriptionExpiration)),
        'MMMM dd, yyyy'
      );

      formatDate(date);
    }

    if (0 === ordersArr.length && 0 < orders.length) {
      setOrdersArr(orders);
    }
  }, [expirationDate, ordersArr]);

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>
        {__('Account', 'mittr')}
      </h1>
      <h2 className={styles.accountSubHeader}>
        {__('Review your order history', 'mittr')}
      </h2>
      {subscriptionActive ? (
        <Subscriptions
          type={subscriptionType}
          expiration={expirationDate}
        />
      ) : (
        <span
          className={classNames(styles.unsubscribedText, {
            [styles.withSeparator]: ordersArr.length,
          })}
        >
          {
            0 === Object.keys(account).length ?
              'Loading...' : 'You are not subscribed.'
          }
        </span>
      )}
      {orders && 0 < orders.length && (
        <React.Fragment>
          <h3 className={styles.heading} id="orders-downloads">
            {__('Orders and downloads', 'mittr')}
          </h3>
          <ul aria-labelledby="orders-downloads">
            {ordersArr.map((order, i) => (
              <li key={order.created}>
                <Order
                  order={{
                    ...order,
                    type: subscriptionType,
                  }}
                  lastItem={(orders.length - 1 === i)}
                />
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

OrderHistory.propTypes = {
  account: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const withRedux = connect(
  (state) => ({
    account: getAccount(state),
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  null
);

export default withRedux(withStyles(styles)(OrderHistory));
