import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './topicHeader.css';

const TopicHeader = ({ name, description }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.name}>{name}</h1>
    <p className={styles.description}>{description}</p>
  </div>
);

TopicHeader.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(TopicHeader);
