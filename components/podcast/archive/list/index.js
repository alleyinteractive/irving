import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
// Styles
import styles from './podcastList.css';

const PodcastList = ({
  children,
}) => (
  <ul className={styles.wrapper}>
    {children}
  </ul>
);

PodcastList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(PodcastList);
