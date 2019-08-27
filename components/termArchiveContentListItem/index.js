import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './termArchiveContentListItem.css';

const TermArchiveContentListItem = ({
  children,
  color,
  excerpt,
  permalink,
  teaseCTA,
  title,
}) => (
  <li className={styles.wrapper}>
    <article className={styles.storyTease}>
      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          <Link className={styles.eyebrowLink} to={permalink} style={{ color }}>
            Climate Change
          </Link>
          <time className={styles.timestamp}>Aug 26</time>
        </div>
        <div className={styles.shareMenu}>
          <button
            type="button"
            aria-label={__('Open share menu', 'mittr')}
            className={styles.shareMenuToggle}
          >
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </button>
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.excerpt}>{excerpt}</p>
      <Link to={permalink} className={styles.callToAction}>
        {teaseCTA}
      </Link>
      {children}
    </article>
  </li>
);

TermArchiveContentListItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  teaseCTA: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(TermArchiveContentListItem);
