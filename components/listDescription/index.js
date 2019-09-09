import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listDescription.css';

// const [firstParagraph] = children;
// const { content } = firstParagraph.props; // eslint-disable-line
// debugger; // eslint-disable-line
const ListDescription = ({ children, color }) => (
  <div className={styles.wrapper} style={{ '--highlight-color': color }}>
    {children}
  </div>
);
ListDescription.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string,
};

ListDescription.defaultProps = {
  color: '#333333',
};

export default withStyles(styles)(ListDescription);
