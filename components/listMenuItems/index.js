import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listMenuItems.css';

const ListMenuItems = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      ListMenuItems
      {children}
    </div>
  );
};

ListMenuItems.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ListMenuItems);

