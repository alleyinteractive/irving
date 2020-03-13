import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import {
  actionShowFullStory,
  actionTruncateStory,
} from 'actions/storyActions';
import useObscureContent from 'hooks/useObscureContent';
import classNames from 'classnames';
import parse from 'html-react-parser';
import styles from './contentBody.css';

const ContentBody = ({
  children,
  truncatedCTA,
  wordCount,
  dispatchShowFullStory,
  dispatchTruncateStory,
  overrideCTA,
  summaryBullets,
}) => {
  const [truncateContent, setTruncation] = useState(false);
  const contentRef = useRef();
  const obscureContent = useObscureContent();

  const showFullText = () => {
    // Remove the truncation button and height limit.
    setTruncation(false);
  };

  useEffect(() => {
    if (obscureContent) {
      setTruncation(true);
      dispatchTruncateStory();
      return;
    }

    const { referrer } = document;
    const { location: { origin } } = window;

    const extractHostname = (url) => (new URL(url)).hostname;

    // Check to see if the referrer exists and contains a hostname.
    // If it does, run the `extractHostname` comparison.
    const isOutsideSource = referrer && 0 < referrer.length ?
      extractHostname(referrer) !== extractHostname(origin) :
      false;

    if (0 === truncatedCTA.length) {
      showFullText();
      dispatchShowFullStory();
    } else if (isOutsideSource) {
      setTruncation(true);
      dispatchTruncateStory();
    } else {
      showFullText();
      dispatchShowFullStory();
    }

    if (true === overrideCTA) {
      showFullText();
      dispatchShowFullStory();
    }
  }, truncateContent);

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.overlay, {
          [styles.overlayVisible]: truncateContent,
        })}
      />

      <div
        className={classNames(styles.content, {
          [styles.contentHidden]: truncateContent,
        })}
        id="content--body"
      >
        <div ref={contentRef}>
          {summaryBullets && (
            <div className={styles.summaryBullets}>
              {parse(summaryBullets)}
            </div>
          )}
          {children}
        </div>
      </div>

      {truncateContent && (
        <button
          className={styles.truncationButton}
          type="button"
          onClick={showFullText}
          disabled={true === obscureContent}
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
  dispatchShowFullStory: () => {},
  dispatchTruncateStory: () => {},
  overrideCTA: false,
  summaryBullets: '',
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
  truncatedCTA: PropTypes.string,
  wordCount: PropTypes.number.isRequired,
  dispatchShowFullStory: PropTypes.func,
  dispatchTruncateStory: PropTypes.func,
  overrideCTA: PropTypes.bool,
  summaryBullets: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchShowStory: () => dispatch(actionShowFullStory()),
  dispatchTruncateStory: () => dispatch(actionTruncateStory()),
});

const withRedux = connect(
  undefined,
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(ContentBody));
