import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { format } from 'date-fns';
import {
  getFirstName,
  getEmail,
  getProfile,
  getAccount,
  isAlum as getIsAlum,
} from 'selectors/zephrSelector';
import history from 'utils/history';
import {
  actionRequestUserLogOut,
  actionSubmitForm,
  actionRequestUpdateEmail,
} from 'actions/zephrActions';

import AccountInfoForm from './infoForm';
import styles from './landingPage.css';

const AccountLandingPage = ({
  firstName,
  email,
  newsletters,
  discounts,
  logOut,
  isAuthenticated,
  submitResetRequest,
  submitUpdateEmail,
  account,
  isAlum,
}) => {
  // Prevent unauthenticated users from being able to visit this route.
  if (! isAuthenticated) {
    history.push('/');
  }

  const [formState, setFormState] = useState({
    isEditingEmail: false,
    isEditingPassword: false,
  });
  const onClickEditEmail = () => {
    setFormState({
      isEditingEmail: true,
      isEditingPassword: false,
    });
  };

  const onSubmitUpdateEmail = (event) => {
    submitUpdateEmail({
      email: event.value,
    });
  };

  const onClickResetPassword = () => {
    submitResetRequest({
      type: 'resetRequest',
      credentials: {
        email,
      },
    });
  };

  const onClickCancel = () => {
    setFormState({
      isEditingEmail: false,
      isEditingPassword: false,
    });
  };

  const generateAccessBanner = () => {
    if (isAlum) {
      return __(
        'You have unlimited access to technologyreview.com. ', 'mittr'
      );
    }

    switch (account.subscriptionType) {
      case 'Basic Digital':
      case 'All Access Digital':
      case 'Online Only Access':
        return __(
          'You have unlimited access to technologyreview.com. ', 'mittr'
        );
      default:
        return __('You have limited access to technologyreview.com. ', 'mittr');
    }
  };

  let renewalDate = '';
  if (account.subscriptionExpiration) {
    renewalDate = format(
      new Date(Date.parse(account.subscriptionExpiration)),
      'MMMM dd, yyyy'
    );
  }

  let accountNumber = '';
  if ('undefined' !== typeof account.orders &&
  0 < account.orders.length
  ) {
    accountNumber = account.orders[0].customer_number;
  }

  const generateSubscriberText = () => {
    if (account.subscriptionActive) {
      return (
        <p>
          {__('You are an', 'mittr')}{' '}
          <strong>
            {account.subscriptionType}{' '}
            {__('subscriber', 'mittr')}{' '}
          </strong>,{' '}
          {__('account', 'mittr')}{' '}
          <strong>#{accountNumber}</strong>.{' '}
          {__(
            'Your subscription will automatically renew on',
            'mittr'
          )}{' '}
          <strong>{renewalDate}</strong>.
        </p>
      );
    }

    if (isAlum) {
      return (
        <p>
          {__('You are an Infinite Connection subscriber.', 'mittr')}
        </p>
      );
    }

    return (
      <p>
        {__('You are not subscribed.', 'mittr')}
      </p>
    );
  };

  const [subscriptionLink, setSubscriptionLink] = useState('');
  useEffect(() => {
    const sfgLink = 'https://subscribe.technologyreview.com/ecom/mtr/app/live/subcustserv?pagemode=start&org=MTR&publ=TR&php=Y&_ga=2.242102080.39622121.1582559852-436121851.1581700602'; // eslint-disable-line max-len

    if (isAlum) {
      // If an alumni has subscription info returning from SFG, allow them to manage their account from that portal.
      if (
        'undefined' !== typeof account.orders &&
        0 < account.orders.length
      ) {
        setSubscriptionLink(sfgLink);
      } else {
        setSubscriptionLink('https://alum.mit.edu/myaccount/');
      }
    } else {
      setSubscriptionLink(sfgLink);
    }
  }, [isAlum]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeBanner}>
        <span className={styles.welcomeMessage}>{__('Welcome', 'mittr')}</span>
        <h1 className={styles.greeting}>
          {__('Hello', 'mittr')}, {firstName}!
        </h1>
        <span className={styles.accessBanner}>
          {generateAccessBanner()}{' '}
          <a href="/contact">{__('Please contact us', 'mittr')}</a>{' '}
          {__('if you have any questions or requests.', 'mittr')}
        </span>
      </div>

      <div className={styles.accountControls}>
        <div className={styles.accountDetails}>
          <h2>{__('Account Details', 'mittr')}</h2>
          <p>
            {__('Your email address is', 'mittr')}{' '}
            <strong>{email}</strong>
            {__(
              '—we send all newsletters and other emails to that address.',
              'mittr'
            )}
          </p>

          <div className={styles.buttonContainer}>
            {! formState.isEditingEmail ? (
              <button
                id="editEmailBtn"
                className={styles.button}
                type="button"
                tabIndex="0"
                onClick={onClickEditEmail}
              >
                {__('Edit your email address', 'mittr')}
              </button>
            ) : (
              <div className={styles.formWrapper}>
                <AccountInfoForm
                  type="email"
                  handleSubmit={(event) => onSubmitUpdateEmail(event)}
                  placeholderValue={email}
                />
                <input
                  type="button"
                  value="Cancel"
                  onClick={onClickCancel}
                  className={styles.secondaryButton}
                />
              </div>
            )}
            <button
              id="editPasswordBtn"
              className={styles.button}
              type="button"
              tabIndex="0"
              onClick={onClickResetPassword}
            >
              {__('Reset your password', 'mittr')}
            </button>

            {0 < newsletters.length && (
              <div className={styles.buttonContainer}>
                <a
                  id="newsletterPrefsBtn"
                  href="https://forms.technologyreview.com/newsletters/?_ga=2.242102080.39622121.1582559852-436121851.1581700602"
                  className={styles.button}
                  role="button"
                >
                  {__('Edit your newsletter preferences', 'mittr')}
                </a>
              </div>
            )}

            <button
              id="editPasswordBtn"
              className={styles.button}
              type="button"
              tabIndex="0"
              onClick={logOut}
            >
              {__('Sign out', 'mittr')}
            </button>
          </div>
        </div>

        <div className={styles.subscription}>
          <h2>{__('Subscription', 'mittr')}</h2>
          {generateSubscriberText()}

          <div className={styles.buttonContainer}>
            <a
              id="subscriptionManagerBtn"
              href={subscriptionLink}
              className={styles.button}
              role="button"
            >
              {__('Manage your subscription', 'mittr')}
            </a>
            <a
              id="orderHistoryBtn"
              href="/account/order-history"
              className={styles.button}
              role="button"
            >
              {__('Review your order history', 'mittr')}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.extraControls}>
        {0 < discounts.length && (
          <div className={styles.discounts}>
            <h2>{__('Discounts and deals', 'mittr')}</h2>
            <p>
              {__(`These codes are subject to change. Please check here before
              purchasing for the most up-to-date offer details.`, 'mittr')}
            </p>
            {0 < discounts.length && (
              <ul className={styles.discountList}>
                {discounts.map((discount) => (
                  <li className={styles.discount}>
                    <h3>{discount.name}</h3>
                    {parse(discount.content)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* eslint-disable max-len */
// @todo The default values here are stubbed out. They will need to be pulled
// from Zephr as the integration is further built out.
AccountLandingPage.defaultProps = {
  discounts: [
    {
      name: 'EmTech Next 2019 Offer',
      content:
        '<p>Your MIT Technology Review subscription entitles you to receive a 10% discount on EmTechNext! <a href="#">Register now</a> using code PRDIGSUB to redeem.</p>',
    },
    {
      name: 'MIT Press discount',
      content:
        '<p>Subscribers can take advantage of a 30% discount on <a href="#">MIT Press</a> publication by using the code MTECHR30 at checkout.',
    },
  ],
  newsletters: ['The Download', 'Chain Letter'],
  account: {
    orders: [],
    subscriptionType: '',
    subscriptionExpiration: '',
    subscriptionActive: false,
  },
  isAlum: false,
};
/* eslint-enable */

AccountLandingPage.propTypes = {
  discounts: PropTypes.array,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  newsletters: PropTypes.array,
  submitResetRequest: PropTypes.func.isRequired,
  submitUpdateEmail: PropTypes.func.isRequired,
  account: PropTypes.object,
  isAlum: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actionRequestUserLogOut()),
  submitResetRequest: (data) => dispatch(actionSubmitForm(data)),
  submitUpdateEmail: (payload) => dispatch(actionRequestUpdateEmail(payload)),
});

const withRedux = connect(
  (state) => ({
    email: getEmail(state),
    firstName: getFirstName(state),
    account: getAccount(state),
    isAlum: getIsAlum(state),
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  mapDispatchToProps,
);

export default withRedux(withStyles(styles)(AccountLandingPage));
