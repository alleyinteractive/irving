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
  const [truncateContent, setTruncation] = useState(false);
  const [contentHeight, setContentHeight] = useState(400);
  const contentRef = useRef();

  const {
    children,
    truncatedCTA,
    wordCount,
  } = props;

  const showFullText = () => {
    // Remove the truncation button and height limit.
    setTruncation(false);
    // Update the container's height to be that of the content.
    setContentHeight(
      contentRef.current.getBoundingClientRect().height
    );
  };

  useEffect(() => {
    const { referrer } = document;
    const { location: { origin } } = window;

    const extractHostname = (url) => (new URL(url)).hostname;
    const isOutsideSource =
      extractHostname(referrer) !== extractHostname(origin);

    if (0 === truncatedCTA.length) {
      showFullText();
    } else if (0 < referrer.length && isOutsideSource) {
      setTruncation(true);
    } else {
      showFullText();
    }
  }, truncateContent);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        style={{ display: 400 === contentHeight ? 'block' : 'none' }}
      />

      <div
        className={400 === contentHeight ? styles.contentHidden : ''}
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

ContentBody.defaultProps = {
  truncatedCTA: '',
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
  truncatedCTA: PropTypes.string,
  wordCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(ContentBody);
