import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import ExpandableSocialShare from 'components/socialList/expandable';
import Eyebrow from '../eyebrow';

// Styles
import styles from './feedItem.css';

const FeedItem = ({
  author,
  articleId,
  children,
  color,
  customEyebrow,
  includeExpandBtn,
  permalink,
  teaserContent,
  position,
  postDate,
  postDateShort,
  postType,
  showImage,
  title,
  themeName,
  topic,
  topicLink,
  headerHeight,
  wordCount,
}) => {
  const [expandState, setExpandState] = useState({
    btnText: 'Expand',
    isExpanded: false,
  });
  const [containerHeight, setContainerHeight] = useState(0);
  const contentRef = React.useRef();
  const articleRef = React.useRef();
  const image = findChildByName('image', children);
  const video = findChildByName('video', children);
  const contentFooter = findChildByName('content-footer', children);
  const socialSharing = findChildByName('social-sharing', children);

  // Theme content block
  const gutenbergContent = findChildByName('gutenberg-content', children);
  const content = React.cloneElement(gutenbergContent, {
    className: styles.content,
    themeName: 'infeed',
  });

  const elementTop = (el, top = 0) => {
    if (el.offsetParent) {
      return elementTop(el.offsetParent, top + el.offsetTop);
    }
    return top + el.offsetTop;
  };

  const toggleStory = (e, fromTitle = false) => {
    e.preventDefault();
    const doExpand = fromTitle || ! expandState.isExpanded;

    setExpandState({
      btnText: doExpand ? 'Collapse' : 'Expand',
      isExpanded: doExpand,
    });

    setContainerHeight(
      doExpand ? contentRef.current.getBoundingClientRect().height : 0
    );

    if (doExpand) {
      window.dataLayer.push({
        event: 'VirtualPageviewWithReferrer',
        virtualPageURL: permalink,
        virtualPageTitle: `${title} | MIT Technology Review`, // @todo don't hard-code this maybe
        virtualPageReferrer: window.location.href,
        contentPosition: position,
        articleId,
        author: author.length ? author[0].name : '',
        publishDate: postDate,
        articleTopic: topic,
        wordCount,
        paywallType: 'Always Free',
        contentType: postType,
      });
    }

    if (fromTitle) {
      window.scrollTo({
        top: elementTop(articleRef.current) - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const titleToggle = (e) => toggleStory(e, true);

  return (
    <article
      ref={articleRef}
      className={classNames(styles.wrapper,
        {
          [styles.storygroup]: 'storygroup' === themeName,
        })}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link to={permalink} onClick={titleToggle}>{title}</Link>
        </h1>
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
            {postDateShort}
          </div>
        </div>
      </header>
      {(video && showImage) &&
      <div className={styles.image}>{video}</div>}
      {(image && showImage) &&
      <div className={styles.image}><Link to={permalink}>{image}</Link></div>}
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
      <ExpandableSocialShare>
        {socialSharing}
      </ExpandableSocialShare>
    </article>
  );
};

FeedItem.defaultProps = {
  color: '#000000',
  customEyebrow: '',
  includeExpandBtn: false,
  showImage: true,
  teaserContent: '',
  themeName: '',
  topic: '',
  headerHeight: 0,
};

FeedItem.propTypes = {
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  articleId: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  includeExpandBtn: PropTypes.bool,
  teaserContent: PropTypes.string,
  customEyebrow: PropTypes.string,
  position: PropTypes.number.isRequired,
  postDate: PropTypes.string.isRequired,
  postDateShort: PropTypes.string.isRequired,
  postType: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  showImage: PropTypes.bool,
  title: PropTypes.string.isRequired,
  themeName: PropTypes.string,
  topic: PropTypes.string,
  topicLink: PropTypes.string.isRequired,
  color: PropTypes.string,
  headerHeight: PropTypes.number,
  wordCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  headerHeight: state.headerHeight,
});

const withRedux = connect(
  mapStateToProps,
  undefined,
);

export default withRedux(withStyles(styles)(FeedItem));
