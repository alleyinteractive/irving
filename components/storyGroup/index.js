import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './storyGroup.css';

const StoryGroup = ({
  children,
}) => (
  <div>{children}</div>
);

StoryGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(StoryGroup);
