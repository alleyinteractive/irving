import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';

// Styles
import styles from './topicHeader.css';

const TopicHeader = ({ name, description, children }) => {
  const { image } = findChildByName('image', children);
  return (
    <header className={styles.wrapper}>
      <div className={styles.meta}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.image}>{image}</div>
    </header>
  );
};

TopicHeader.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(TopicHeader);
