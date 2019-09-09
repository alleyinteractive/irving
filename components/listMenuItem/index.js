import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listMenuItem.css';

const ListMenuItem = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      ListMenuItem
      {children}
    </div>
  );
};

ListMenuItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ListMenuItem);

