import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Themes.
import styles from './video.css';

const Video = ({ url, caption }) => (
  <figure className={styles.figure}>
    <video
      autoPlay
      muted
      loop
      src={url}
      className={styles.video}
    />
    <figcaption className={styles.caption}>{caption}</figcaption>
  </figure>
);

Video.propTypes = {
  url: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

Video.defaultProps = {
  caption: '',
};

export default (withStyles(styles)(Video));
