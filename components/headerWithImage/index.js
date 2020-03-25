import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';

// Styles
import styles from './headerWithImage.css';

const HeaderWithImage = ({ children, title }) => {
  const image = findChildByName('image', children);
  const video = findChildByName('video', children);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <span className={styles.innerTitle}>{title}</span>
      </h1>
      {image && <div className={styles.image}>{image}</div>}
      {video && <div className={styles.image}>{video}</div>}
    </div>
  );
};

HeaderWithImage.defaultProps = {
  title: '',
};

HeaderWithImage.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string,
};

export default withStyles(styles)(HeaderWithImage);
