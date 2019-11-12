/* eslint-disable */
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import styles from './contentBody.css';

const ContentBody = (props) => {
  const [truncateContent, setTruncation] = useState(true);
  const [contentHeight, setContentHeight] = useState(400);
  const contentRef = useRef();

  const {
    children,
    truncatedCTA,
    wordCount
  } = props;

  useEffect(() => {
    const { referrer } = document;
    const { location: { origin } } = window;

    if (referrer !== origin) {
      setTruncation(true);
    } else {
      showFullText();
    }
  }, truncateContent);

  const showFullText = () => {
    // Remove the truncation button and height limit.
    setTruncation(false);
    // Update the container's height to be that of the content.
    setContentHeight(
      contentRef.current.getBoundingClientRect().height
    );
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        style={{ display: contentHeight === 400 ? 'block' : 'none' }}
      />

      <div
        className={contentHeight === 400 ? styles.contentHidden : ''}
        style={{ height: contentHeight }}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>

      {truncateContent && (
        <button
          className={styles.truncationButton}
          type="button"
          onClick={showFullText}
        >
          <strong>{__(`${truncatedCTA}`, 'mittr')}</strong>{' '}
          {__(`${wordCount} words`, 'mittr')}
        </button>
      )}
    </div>
  );
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ContentBody);
