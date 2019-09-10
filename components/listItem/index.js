import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listItem.css';

const ListItem = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      ListItem
      {children}
    </div>
  );
};

ListItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ListItem);

