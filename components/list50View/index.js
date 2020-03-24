import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './list50View.css';

const List50View = (props) => {
  const {
    children,
  } = props;

  return (
    <ul className={styles.wrapper}>
      {(children && children.length) && children.map((child) => child)}
    </ul>
  );
};

List50View.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(List50View);
