import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/helpers/link';

// Styles
import styles from './eyebrow.css';

const Eyebrow = ({
  color, customEyebrow, themeName, topic, topicLink,
}) => {
  if ('' === customEyebrow) {
    return (
      <Link
        className={classNames(styles.eyebrowLink, {
          [styles.fullStory]: 'In Feed' !== themeName,
        })}
        to={topicLink}
        style={{ color }}
      >
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

Eyebrow.defaultProps = {
  themeName: 'In Feed',
};

Eyebrow.propTypes = {
  color: PropTypes.string,
  customEyebrow: PropTypes.string.isRequired,
  themeName: PropTypes.string,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string.isRequired,
};

Eyebrow.defaultProps = { color: '#000000' };

export default Eyebrow;
