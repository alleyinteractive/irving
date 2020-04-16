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
      <div className={classNames({
        [styles.wrap]:
          'In Feed' !== themeName && 'anchorEyebrow' !== themeName,
      })}
      >
        <div
          className={classNames(
            styles.eyebrow,
            {
              [styles.anchorEyebrow]: 'anchorEyebrow' === themeName,
              [styles.fullStoryEyebrow]:
                'In Feed' !== themeName && 'anchorEyebrow' !== themeName,
            }
          )}
          style={{ color }}
        >
          {customEyebrow}
          {(
            dateline &&
            <span className={styles.date}>{dateline}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={'In Feed' !== themeName ? styles.wrap : ''}>
      {topic && (
        <Link
          className={classNames(
            styles.eyebrow,
            {
              [styles.anchorEyebrow]: 'anchorEyebrow' === themeName,
              [styles.fullStoryEyebrow]:
                'In Feed' !== themeName && 'anchorEyebrow' !== themeName,
            }
          )}
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
          className={classNames(
            styles.eyebrowLink,
            { [styles.fullStoryEyebrow]: 'In Feed' !== themeName }
          )}
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
  topic: '',
  topicLink: '',
};

Eyebrow.propTypes = {
  color: PropTypes.string,
  customEyebrow: PropTypes.string,
  dateline: PropTypes.string,
  subTopic: PropTypes.string,
  subTopicLink: PropTypes.string,
  themeName: PropTypes.string,
  topic: PropTypes.string,
  topicLink: PropTypes.string,
};

Eyebrow.defaultProps = { color: '#000000' };

export default withStyles(styles)(Eyebrow);
