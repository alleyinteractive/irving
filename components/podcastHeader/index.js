import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';

// Styles
import styles from './podcastHeader.css';

const PodcastHeader = ({
  children,
  description,
  title,
}) => {
  const image = findChildByName('image', children);
  return (
    <header className={styles.wrapper}>
      {image}
      <h1 className={styles.name}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
};

PodcastHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(PodcastHeader);
