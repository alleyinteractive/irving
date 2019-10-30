import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import TwitterIcon from 'assets/icons/twitter.svg';
import FacebookIcon from 'assets/icons/facebook.svg';
import GoogleIcon from 'assets/icons/google.svg';
import parse from 'html-react-parser';
import { __ } from '@wordpress/i18n';

import AccountInfoForm from './infoForm';
import styles from './landingPage.css';

const AccountLandingPage = ({
  name,
  subscriptionName,
  subscriptionType,
  accountNumber,
  email,
  newsletters,
  discounts,
  renewalDate,
}) => {
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
  const onClickEditPassword = () => {
    setFormState({
      isEditingEmail: false,
      isEditingPassword: true,
    });
  };

  const generateAccessBanner = () => {
    switch (subscriptionType) {
      case 'all-access':
        return __('You have unlimited access to technologyreview.com', 'mittr');
      default:
        return __('You have limited access to technologyreview.com', 'mittr');
    }
  };

  const generateNewsletterString = () => {
    let str = '';

    newsletters.forEach((n, index, array) => {
      if (index === array.length) {
        str += n;
      } else if (0 === index && ! 2 < array.length) {
        str += `<strong>${n}</strong> `;
      } else if (0 === index && 2 < array.length) {
        str += `<strong>${n}</strong>, `;
      } else if (index === array.length - 2) {
        str += `<strong>${n}</strong> `;
      } else if (index === array.length - 1) {
        str += `and <strong>${n}</strong>`;
      } else {
        str += `${n}, `;
      }
    });

    return str;
  };

  const truncatedName = name.split(' ')[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeBanner}>
        <span className={styles.welcomeMessage}>{__('Welcome', 'mittr')}</span>
        <h1 className={styles.greeting}>
          {__('Hello', 'mittr')}, {truncatedName}!
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
              '—we send all newsletters and other emails to that address',
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
                {__('Edit your email addresss', 'mittr')}
              </button>
            ) : (
              <AccountInfoForm
                type="email"
                handleSubmit={() => {}}
                placeholderValue={email}
              />
            )}

            {! formState.isEditingPassword ? (
              <button
                id="editPasswordBtn"
                className={styles.button}
                type="button"
                tabIndex="0"
                onClick={onClickEditPassword}
              >
                {__('Edit your password', 'mittr')}
              </button>
            ) : (
              <AccountInfoForm
                type="password"
                handleSubmit={() => {}}
                placeholderValue="password"
              />
            )}
          </div>

          {0 < newsletters.length && (
            <Fragment>
              <p>
                {__('We send you', 'mittr')}{' '}
                {parse(generateNewsletterString())}{' '}
                {`newsletter${1 < newsletters.length ? 's' : ''}`}{' '}
                {__('each week.', 'mittr')}
              </p>
              <div className={styles.buttonContainer}>
                <a
                  id="newsletterPrefsBtn"
                  href="/account/newsletter-preferences"
                  className={styles.button}
                  role="button"
                >
                  {__('Edit your newsletter preferences', 'mittr')}
                </a>
              </div>
            </Fragment>
          )}
        </div>

        <div className={styles.subscription}>
          <h2>{__('Subscription', 'mittr')}</h2>
          <p>
            {__('You are an', 'mittr')}{' '}
            <strong>
              {subscriptionName}{' '}
              {__('subscriber', 'mittr')}{' '}
            </strong>,{' '}
            {__('account', 'mittr')}{' '}
            <strong>#{accountNumber}</strong>.{' '}
            {__('Your subscription will automatically renew on', 'mittr')}{' '}
            <strong>{renewalDate}</strong>.
          </p>

          <div className={styles.buttonContainer}>
            <a
              id="subscriptionManagerBtn"
              href="/accout/manage-subscription"
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
            <a
              id="purchaseSubscriptionBtn"
              href="/account/purchase-gift"
              className={styles.button}
              role="button"
            >
              {__('Purchase a gift subscription', 'mittr')}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.extraControls}>
        <div className={styles.socialConnections}>
          <h2>{__('Social login connections', 'mittr')}</h2>
          <p>
            {__(`Simplify signing in by connecting your social media accounts 
            to this site. (We will never post anything to your social media
            accounts on your behalf without explicitly asking for your
            permission first, of course.)`, 'mittr')}
          </p>

          <div className={styles.buttonContainer}>
            <button
              id="facebookConnectBtn"
              className={styles.button}
              type="button"
              tabIndex="0"
            >
              <div className={styles.facebookIcon}>
                <FacebookIcon />
              </div>
              {__('Connect Facebook', 'mittr')}
            </button>
            <button
              id="twitterConnectBtn"
              className={styles.button}
              type="button"
              tabIndex="0"
            >
              <div className={styles.twitterIcon}>
                <TwitterIcon />
              </div>
              {__('Connect Twitter', 'mittr')}
            </button>
            <button
              id="googleConnectBtn"
              className={styles.button}
              type="button"
              tabIndex="0"
            >
              <div className={styles.googleIcon}>
                <GoogleIcon />
              </div>
              {__('Connect Google', 'mittr')}
            </button>
          </div>
        </div>

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
AccountLandingPage.defaultProps = {
  accountNumber: 1635767369,
  email: 'penelope.jackson@technologyreview.com',
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
  name: 'Penelope Jackson',
  newsletters: ['The Download', 'Chain Letter'],
  renewalDate: 'May 1, 2020',
  subscriptionName: 'All Access Digital',
  subscriptionType: 'all-access',
};
/* eslint-enable */

AccountLandingPage.propTypes = {
  accountNumber: PropTypes.number,
  discounts: PropTypes.array,
  email: PropTypes.string,
  name: PropTypes.string,
  newsletters: PropTypes.array,
  subscriptionName: PropTypes.string,
  subscriptionType: PropTypes.string,
  renewalDate: PropTypes.string,
};

export default withStyles(styles)(AccountLandingPage);
