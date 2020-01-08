import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';
import Eyebrow from '../eyebrow';

// Styles
import styles from './feedItem.css';

const FeedItem = ({
  children,
  color,
  customEyebrow,
  includeExpandBtn,
  teaserContent,
  postDate,
  showImage,
  title,
  themeName,
  topic,
  topicLink,
}) => {
  const [expandState, setExpandState] = useState({
    btnText: 'Expand',
    isExpanded: false,
  });
  const [containerHeight, setContainerHeight] = useState(0);
  const contentRef = React.useRef();
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
    });
    if (expandState.isExpanded) {
      setContainerHeight(
        0 === containerHeight ?
          contentRef.current.getBoundingClientRect().height : 0
      );
    } else {
      setContainerHeight(0);
    }
  };

  return (
    <article className={classNames(styles.wrapper, {
      [styles.storygroup]: 'storygroup' === themeName,
    })}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <div className={styles.eyebrow}>
            <span className="screen-reader-text">
              {__('Category: ', 'mittr')}
            </span>
            <Eyebrow
              customEyebrow={customEyebrow}
              themeName="In Feed"
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
              <p>{teaserContent}</p>
            </div>
          )}
          <div
            style={{ height: containerHeight }}
            className={styles.mainCopyWrap}
          >
            <div ref={contentRef}>
              <div className={styles.content}>
                {content}
              </div>
              {contentFooter}
            </div>
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
  teaserContent: '',
  themeName: '',
};

FeedItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  includeExpandBtn: PropTypes.bool,
  teaserContent: PropTypes.string,
  customEyebrow: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  showImage: PropTypes.bool,
  title: PropTypes.string.isRequired,
  themeName: PropTypes.string,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default withStyles(styles)(FeedItem);
