import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
// Styles
import PropTypes from 'prop-types';
import styles from './accountNavigation.css';
import Menu from '../../menu';
import MenuItemStatic from '../../menuItemStatic';

const AccountNavigation = ({ currentPage }) => {
  const nav = [
    {
      page: 'manageSubscription',
      label: __('Manage your subscription', 'mittr'),
      url: '/account/manage-subscription',
    },
    {
      page: 'orderHistory',
      label: __('Review your order history', 'mittr'),
      url: '/account/order-history',
    },
    {
      page: 'purchaseGift',
      label: __('Purchase a gift subscription', 'mittr'),
      url: '/account/purchase-gift',
    },
    {
      page: 'newsletterPreferences',
      label: __('Edit your newsletter preferences', 'mittr'),
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
