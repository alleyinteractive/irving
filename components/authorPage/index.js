/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import TwitterIcon from 'assets/icons/twitter.svg';
import { findChildByName } from 'utils/children';
import styles from './authorPage.css';

const AuthorPage = ({
  children,
  name,
  title,
  twitter,
}) => {
  const image = findChildByName('image', children);
  const bio = findChildByName('html', children);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <div className={styles.imageWrapper}>
          {image}
          <span className={styles.title}>{title}</span>
        </div>

        <div>
          <div className={styles.profile}>
            <div className={styles.mobileImageWrapper}>
              {image}
            </div>

            <div className={styles.meta}>
              <h2 className={styles.affiliation}>Our team</h2>
              <h1 className={styles.name}>{name}</h1>
              <span className={styles.title}>{title}</span>
            </div>
          </div>

          <div className={styles.bio}>{bio}</div>

          {twitter && (
            <div className={styles.twitter}>
              <div className={styles.socialIcon}>
                <TwitterIcon />
              </div>
              <span>{twitter}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AuthorPage.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
};

export default withStyles(styles)(AuthorPage);
