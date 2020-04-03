import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import classNames from 'classnames';

// Styles
import styles from './headerWithImage.css';

const HeaderWithImage = ({
  showAlernateLayout,
  children,
  title,
}) => {
  const image = findChildByName('image', children);
  const video = findChildByName('video', children);
  return (
    <div className={classNames(styles.wrapper, {
      [styles.altLayout]: showAlernateLayout,
    })}
    >
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
  showAlernateLayout: false,
};

HeaderWithImage.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string,
  showAlernateLayout: PropTypes.bool,
};

export default withStyles(styles)(HeaderWithImage);
