import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './pageBody.css';

const PageBody = (props) => {
  const { children, title } = props;

  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(PageBody);
