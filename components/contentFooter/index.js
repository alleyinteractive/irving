import React from 'react';
import PropTypes from 'prop-types';
import { findChildByName } from 'utils/children';

// Styles
import styles from './contentFooter.css';

const ContentFooter = ({ children }) => {
  const socialSharing = findChildByName('social-sharing', children);
  return <div className={styles.wrapper}>{socialSharing}</div>;
};

ContentFooter.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ContentFooter;
