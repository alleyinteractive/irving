import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/helpers/link';

// Styles
import styles from './inFeedItem.css';

const FeedEyebrow = ({
  customEyebrow, topic, topicLink, color,
}) => {
  if ('' === customEyebrow) {
    return (
      <Link className={styles.eyebrowLink} to={topicLink} style={{ color }}>
        {topic}
      </Link>
    );
  }

  return (
    <div className={styles.eyebrow} style={{ color }}>
      {customEyebrow}
    </div>
  );
};

FeedEyebrow.propTypes = {
  customEyebrow: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default FeedEyebrow;
