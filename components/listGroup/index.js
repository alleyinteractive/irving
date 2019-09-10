import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listGroup.css';

const ListGroup = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      ListGroup
      {children}
    </div>
  );
};

ListGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ListGroup);

