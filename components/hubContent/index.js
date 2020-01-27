import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
// Styles
import styles from './hubContent.css';

const HubContent = ({ children, title }) => {
  const content = findChildByName('html', children);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <span className={styles.innerTitle}>{title}</span>
      </h1>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

HubContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(HubContent);
