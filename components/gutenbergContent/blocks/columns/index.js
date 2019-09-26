import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './columns.css';

const Columns = (props) => {
  const { children } = props;

  return (
    <div className={styles.wrapper}>
      <div className="wp-block-columns">
        {children}
      </div>
    </div>
  );
};

Columns.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
};

export default withStyles(styles)(Columns);
