import React from 'react';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import PropTypes from 'prop-types';
import styles from './accountNavigation.css';
import Menu from '../../menu';
import MenuItemStatic from '../../menuItemStatic';

const AccountNavigation = (props) => {
  const {
    currentPage,
  } = props;
  const nav = [
    {
      page: 'manageSubscription',
      label: 'Manage your subscription',
      url: '/account/manage-subscription',
    },
    {
      page: 'orderHistory',
      label: 'Review your order history',
      url: '/account/order-history',
    },
    {
      page: 'purchaseGift',
      label: 'Purchase a gift subscription',
      url: '/account/purchase-gift',
    },
    {
      page: 'newsletterPreferences',
      label: 'Edit your newsletter preferences',
      url: '#',
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Menu
        displayTitle
        title="Manage your account"
        themeName="sidebar"
      >
        {nav.map((item) => (
          <MenuItemStatic
            themeName="sidebar"
            label={item.label}
            url={item.url}
            isCurrentPage={(item.page === currentPage)}
          />
        ))}
      </Menu>
    </div>
  );
};

AccountNavigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default withStyles(styles)(AccountNavigation);
