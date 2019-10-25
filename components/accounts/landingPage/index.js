/* eslint-disable max-len */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import TwitterIcon from 'assets/icons/twitter.svg';
import FacebookIcon from 'assets/icons/facebook.svg';
import GoogleIcon from 'assets/icons/reddit.svg'; // @todo get a svg of the Google `G`

import styles from './landingPage.css';

const AccountLandingPage = ({
  name,
  subscription,
  email,
  newsletters,
  discounts,
}) => {
  const generateAccessBanner = () => {
    switch (subscription.type) {
      case 'all-access':
        return 'You have unlimited access to technologyreview.com';
      default:
        return 'You have limited access to technologyreview.com';
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
        <span className={styles.welcomeMessage}>Welcome</span>
        <h1 className={styles.greeting}>Hello, {truncatedName}!</h1>
        <span className={styles.accessBanner}>
          {generateAccessBanner()} <a href="/contact">Please contact us</a> if
          you have any questions or requests.
        </span>
      </div>

      <div className={styles.accountControls}>
        <div className={styles.accountDetails}>
          <h2>Account Details</h2>
          <p>
            Your email address is <strong>{email}</strong>—we send all
            newsletters and other email to that address.
          </p>

          <div className={styles.buttonGroup}>
            <button className={styles.button} type="button">
              Edit your email address
            </button>
            <button className={styles.button} type="button">
              Change your password
            </button>
          </div>

          {0 < newsletters.length && (
            <Fragment>
              <p>
                We send you <div className={styles.inlineString} dangerouslySetInnerHTML={{ __html: generateNewsletterString() }} />{' '}
                {`newsletter${1 < newsletters.length ? 's' : ''}`} each week.
              </p>
              <a href="/account/newsletter-preferences" className={styles.button} type="button">
                Edit your newsletter preferenes
              </a>
            </Fragment>
          )}
        </div>

        <div className={styles.subscription}>
          <h2>Subscription</h2>
          <p>
            You are an{' '}
            <strong>{subscription.subscriptionName} subscriber</strong>, account{' '}
            <strong>#{subscription.accountNumber}</strong>. Your subscription
            will automatically renew on{' '}
            <strong>{subscription.renewDate}</strong>.
          </p>

          <div className={styles.buttonGroup}>
            <a href="/accout/manage-subscription" className={styles.button}>
              Manage your subscription
            </a>
            <a href="/account/order-history" className={styles.button}>
              Review your order history
            </a>
            <a href="/account/purchase-gift" className={styles.button}>
              Purchase a gift subscription
            </a>
          </div>
        </div>
      </div>

      <div className={styles.extraControls}>
        <div className={styles.socialConnections}>
          <h2>Social login connections</h2>
          <p>
            Simplify signing in by connecting your social media accounts to this
            site. (We will never post anything to your social media accounts on
            your behalf without explicitly asking for your permission first, of
            course.)
          </p>

          <div className={styles.buttonGroup}>
            <button className={styles.button} type="button">
              <div className={styles.facebookIcon}>
                <FacebookIcon />
              </div>
              Connect Facebook
            </button>
            <button className={styles.button} type="button">
              <div className={styles.twitterIcon}>
                <TwitterIcon />
              </div>
              Connect Twitter
            </button>
            <button className={styles.button} type="button">
              <div className={styles.googleIcon}>
                <GoogleIcon />
              </div>
              Connect Google
            </button>
          </div>
        </div>

        {0 < discounts.length && (
          <div className={styles.discounts}>
            <h2>Discounts and deals</h2>
            <p>
              These codes are subject to change. Please check here before
              purchasing for the most up-to-date offer details.
            </p>
            {0 < discounts.length && (
              <ul className={styles.discountList}>
                {discounts.map((discount) => (
                  <li className={styles.discount}>
                    <h3>{discount.name}</h3>
                    <div dangerouslySetInnerHTML={{ __html: discount.content }} />
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

AccountLandingPage.defaultProps = {
  name: 'Penelope Jackson',
  subscription: {
    type: 'all-access',
    subscriptionName: 'All Access Digital',
    accountNumber: 1635767369,
    renewDate: 'May 1, 2020',
  },
  email: 'penelope.jackson@technologyreview.com',
  newsletters: ['The Download', 'Chain Letter'],
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
};

AccountLandingPage.propTypes = {
  name: PropTypes.string,
  subscription: PropTypes.object,
  email: PropTypes.string,
  newsletters: PropTypes.array,
  discounts: PropTypes.array,
};

export default withStyles(styles)(AccountLandingPage);
