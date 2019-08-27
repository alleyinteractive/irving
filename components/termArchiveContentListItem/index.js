import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './termArchiveContentListItem.css';

const TermArchiveContentListItem = ({
  excerpt, permalink, title, children,
}) => {
  console.log(permalink, excerpt);
  return (
    <div className={styles.wrapper}>
      <article className={styles.storyTease}>
        <div className={styles.meta}>
          <div className={styles.metaLeft}>
            <a className={styles.eyebrowLink} href="https://technologyreview.com">
              Climate Change
            </a>
            <time className={styles.timestamp}>Aug 26</time>
          </div>
          <div className={styles.shareMenu}>
            <button
              type="button"
              aria-label="Open Share Menu"
              className={styles.shareMenuToggle}
            >
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </button>
          </div>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>At a major AI research conference,
        one researcher laid out how existing AI techniques might be used
        to analyze causal relationships in data.
        </p>
        <h4 className={styles.subTitle}>Welcome to the new chip race</h4>
        {children}
      </article>
    </div>
  );
};

TermArchiveContentListItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
};

export default withStyles(styles)(TermArchiveContentListItem);

