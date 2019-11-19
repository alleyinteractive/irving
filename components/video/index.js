import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Themes.
import styles from './video.css';

const Video = ({ url, caption }) => (
  <div>
    <figure className={styles.figure}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        loop
        src={url}
        className={styles.video}
      />
      <div className={styles.caption}>{caption}</div>
    </figure>
  </div>
);

Video.propTypes = {
  url: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

Video.defaultProps = {
  caption: 'Caption',
};

export default (withStyles(styles)(Video));
