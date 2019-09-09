import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listMenu.css';

const ListMenu = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      ListMenu
      {children}
    </div>
  );
};

ListMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ListMenu);

