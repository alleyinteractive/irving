import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';
import FeedEyebrow from './feedEyebrow';

// Styles
import styles from './feedItem.css';

let tempHeight = null;
const FeedItem = ({
  children,
  color,
  customEyebrow,
  includeExpandBtn,
  postDate,
  showImage,
  title,
  topic,
  topicLink,
}) => {
  const [expandState, setExpandState] = useState({
    btnText: 'Expand',
    isExpanded: false,
    containerHeight: 'auto',
  });
  const drawerRef = React.useRef(null);
  useEffect(() => {
    if (drawerRef.current && null === tempHeight) {
      tempHeight = drawerRef.current.getBoundingClientRect().height;
      setExpandState({
        btnText: 'Expand',
        isExpanded: false,
        containerHeight: 0,
      });
    }
  });
  const image = findChildByName('image', children);
  const contentFooter = findChildByName('content-footer', children);

  // Theme content block
  const gutenbergContent = findChildByName('gutenberg-content', children);
  const content = React.cloneElement(gutenbergContent, {
    className: styles.content,
    themeName: 'infeed',
  });

  const toggleStory = () => {
    setExpandState({
      btnText: 'Expand' === expandState.btnText ? 'Collapse' : 'Expand',
      isExpanded: expandState.isExpanded = ! expandState.isExpanded,
      containerHeight: 0 === expandState.containerHeight ? tempHeight : 0,
    });
  };

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <div className={styles.eyebrow}>
            <span className="screen-reader-text">
              {__('Category: ', 'mittr')}
            </span>
            <FeedEyebrow
              customEyebrow={customEyebrow}
              topic={topic}
              topicLink={topicLink}
              color={color}
            />
          </div>
          <div className="postDate">
            <span className="screen-reader-text">{__('Posted ', 'mittr')}</span>
            {postDate}
          </div>
        </div>
      </header>
      {(image && showImage) && <div className={styles.image}>{image}</div>}
      {! includeExpandBtn && (
        <Fragment>
          <div className={styles.content}>
            {content}
          </div>
          {contentFooter}
        </Fragment>
      )}
      {includeExpandBtn && (
        <div className={styles.expandableBody}>
          {! expandState.isExpanded && (
            <div className={styles.textBeforeBtn}>
              <p>Hello here is some trimmed content ...</p>
            </div>
          )}
          <div
            ref={drawerRef}
            style={{ height: expandState.containerHeight }}
            className={classNames(styles.mainCopyWrap, {
              [styles.isExpanded]: expandState.isExpanded,
            })}
          >
            <div className={styles.content}>
              {content}
            </div>
            {contentFooter}
          </div>
          <div className={styles.expandBtnWrap}>
            <button
              type="button"
              className={styles.expandBtn}
              onClick={toggleStory}
            >
              {__(expandState.btnText, 'mittr')}
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

FeedItem.defaultProps = {
  color: '#000000',
  includeExpandBtn: false,
  showImage: true,
};

FeedItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  includeExpandBtn: PropTypes.bool,
  customEyebrow: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  showImage: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default withStyles(styles)(FeedItem);
