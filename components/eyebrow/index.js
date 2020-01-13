import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './eyebrow.css';

const Eyebrow = ({
  color,
  customEyebrow,
  dateline,
  subTopic,
  subTopicLink,
  themeName,
  topic,
  topicLink,
}) => {
  if (customEyebrow) {
    return (
      <div
        className={classNames(styles.eyebrow, {
          [styles.anchorEyebrow]: 'anchorEyebrow' === themeName,
        })}
        style={{ color }}
      >
        {customEyebrow}
        {(
          dateline &&
          <span>{dateline}</span>
        )}
      </div>
    );
  }

  return (
    <div className={'In Feed' !== themeName ? styles.wrap : ''}>
      {topic && (
        <Link
          className={classNames(styles.eyebrowLink, {
            [styles.fullStoryLink]: 'In Feed' !== themeName,
          })}
          to={topicLink}
          style={{ color }}
        >
          {topic}
        </Link>
      )}
      {subTopic && (
        <span style={{ color }}>/</span>
      )}
      {/* Subtopics are only shown in the eyebrow on
        full story pages, they are hidden when in the feed.
       */}
      {(subTopic && 'In Feed' !== themeName) && (
        <Link
          className={classNames(styles.eyebrowLink, {
            [styles.fullStoryLink]: 'In Feed' !== themeName,
          })}
          to={subTopicLink}
          style={{ color }}
        >
          {subTopic}
        </Link>
      )}
    </div>
  );
};

Eyebrow.defaultProps = {
  themeName: 'In Feed',
  customEyebrow: '',
  dateline: '',
  subTopic: '',
  subTopicLink: '',
};

Eyebrow.propTypes = {
  color: PropTypes.string,
  customEyebrow: PropTypes.string,
  dateline: PropTypes.string,
  subTopic: PropTypes.string,
  subTopicLink: PropTypes.string,
  themeName: PropTypes.string,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string.isRequired,
};

Eyebrow.defaultProps = { color: '#000000' };

export default withStyles(styles)(Eyebrow);
