/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import TwitterIcon from 'assets/icons/twitter.svg';
import FacebookIcon from 'assets/icons/facebook.svg';
import LinkedinIcon from 'assets/icons/linkedin.svg';
import { findChildByName } from 'utils/children';
import styles from './authorPage.css';

const AuthorPage = ({
  children,
  name,
  title,
  type,
  twitter,
  facebook,
  linkedin,
}) => {
  const image = findChildByName('image', children);
  const bio = findChildByName('html', children);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <div className={styles.imageWrapper}>
          <div className={styles.profileImage}>{image}</div>
          <span className={styles.title}>{title}</span>
        </div>

        <div>
          <div className={styles.profile}>
            <div className={styles.mobileImageWrapper}>
              {image}
            </div>

            <div className={styles.meta}>
              <h2 className={styles.affiliation}>
                {'staff' === type ? 'Our Team' : 'Contributor'}
              </h2>
              <h1 className={styles.name}>{name}</h1>
              <span className={styles.title}>{title}</span>
            </div>
          </div>

          <div className={styles.bio}>{bio}</div>

          {twitter && (
            <a className={styles.socialLink} href={`https://twitter.com/${twitter}`}>
              <div className={styles.twitterIcon}>
                <TwitterIcon />
              </div>
              <span>{twitter}</span>
            </a>
          )}

          {facebook && (
            <a className={styles.socialLink} href={`https://facebook.com/${facebook}`}>
              <div className={styles.facebookIcon}>
                <FacebookIcon />
              </div>
              <span>{facebook}</span>
            </a>
          )}

          {linkedin && (
            <a className={styles.socialLink} href={`https://linkedin.com/in/${linkedin}`}>
              <div className={styles.linkedinIcon}>
                <LinkedinIcon />
              </div>
              <span>{linkedin}</span>
            </a>
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
  type: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
};

export default withStyles(styles)(AuthorPage);
