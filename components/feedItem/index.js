import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';
import FeedEyebrow from './feedEyebrow';

// Styles
import styles from './feedItem.css';

const FeedItem = ({
  children,
  color,
  customEyebrow,
  postDate,
  title,
  topic,
  topicLink,
}) => {
  const image = findChildByName('image', children);
  const contentFooter = findChildByName('content-footer', children);

  // Theme content block
  const gutenbergContent = findChildByName('gutenberg-content', children);
  const content = React.cloneElement(gutenbergContent, {
    className: styles.content,
    themeName: 'infeed',
  });

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
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.content}>{content}</div>
      {contentFooter}
    </article>
  );
};

FeedItem.defaultProps = {
  color: '#000000',
};

FeedItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  customEyebrow: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default withStyles(styles)(FeedItem);
