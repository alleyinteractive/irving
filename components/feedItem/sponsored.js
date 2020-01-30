import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import { findChild } from 'utils/children';

// Styles
import styles from './feedItem.css';

const SponsoredFeedItem = ({
  permalink,
  title,
  teaserContent,
  sponsorUrl,
  children,
  sponsorTagline,
}) => {
  const logo = findChild('imageSize', 'logo', children);

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          <Link to={permalink}>{title}</Link>
        </h3>
        <div className={styles.meta}>
          <h4 className={styles.sponsorMetaTag}>
            {__('Sponsored', 'mittr')}
          </h4>
        </div>
      </header>
      {teaserContent && (
        <div className={styles.sponsorExcerpt}>
          <p>{teaserContent}</p>
        </div>
      )}
      <Link to={sponsorUrl} className={styles.sponsorLink}>
        <div className={styles.sponsorLogo}>
          {logo}
        </div>
        {sponsorTagline && (
          <span className={styles.sponsorTagline}>
            {sponsorTagline}
          </span>
        )}
      </Link>
    </article>
  );
};

SponsoredFeedItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  teaserContent: PropTypes.string.isRequired,
  sponsorUrl: PropTypes.string.isRequired,
  sponsorTagline: PropTypes.string.isRequired,
};

export default withStyles(styles)(SponsoredFeedItem);
