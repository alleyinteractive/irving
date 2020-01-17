import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';

// Styles
import styles from './teamModuleItem.css';

const TeamModuleItem = ({
  authorName,
  authorUrl,
  children,
  postTitle,
  postUrl,
}) => (
  <li className={styles.item}>
    <div className={styles.imageWrapper}>
      <Link to={authorUrl}>{findChildByName('image', children)}</Link>
    </div>
    <div className={styles.contentWrapper}>
      <Link to={authorUrl} className={styles.authorLink}>{authorName}</Link>
      <Link to={postUrl} className={styles.postLink}>{postTitle}</Link>
    </div>
  </li>
);

TeamModuleItem.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  postTitle: PropTypes.string.isRequired,
  postUrl: PropTypes.string.isRequired,
};

export default withStyles(styles)(TeamModuleItem);
