import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './feedItem.css';

const SponsoredFeedItem = ({
  permalink,
  title,
  teaserContent,
  url,
  logo,
  tagline,
}) => (
  <article className={styles.wrapper}>
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to={permalink}>{title}</Link>
      </h1>
      <div className={styles.meta}>
        <h4 className={styles.sponsorMetaTag}>
          {__('Sponsored', 'mittr')}
        </h4>
      </div>
    </header>
    <div className={styles.sponsorExcerpt}>
      <p>{teaserContent}</p>
    </div>
    <Link to={url} className={styles.sponsorLink}>
      <div className={styles.sponsorLogo}>
        {logo}
      </div>
      <span className={styles.sponsorTagline}>
        {tagline}
      </span>
    </Link>
  </article>
);

SponsoredFeedItem.propTypes = {
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  teaserContent: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  logo: PropTypes.element.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default withStyles(styles)(SponsoredFeedItem);
