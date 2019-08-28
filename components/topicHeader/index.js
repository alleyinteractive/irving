import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';

// Styles
import styles from './topicHeader.css';

const TopicHeader = ({
  name, description, children, color,
}) => {
  const image = findChildByName('image', children);
  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={styles.meta}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.image}>{image}</div>
    </header>
  );
};

TopicHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(TopicHeader);
