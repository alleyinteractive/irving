/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import styles from './contentBody.css';

const ContentBody = (props) => {
  const [truncateContent, setTruncationValue] = useState(false);
  const {
    children,
    truncatedCTA,
    wordCount
  } = props;
  useEffect(() => {
    const { referrer } = document;
    const { location: { origin } } = window;

    if (referrer !== origin) {
      setTruncationValue(true);
    }
  });

  if (truncateContent) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.truncatedContent}>{children}</div>

        <button
          className={styles.truncationButton}
          type="button"
          onClick={() => setTruncationValue(false)}
        >
          <strong>{__(`${truncatedCTA}`, 'mittr')}</strong>{' '}
          {__(`${wordCount} words`, 'mittr')}
        </button>
      </div>
    );
  }

  return <div className={styles.wrapper}>{children}</div>;
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ContentBody);
