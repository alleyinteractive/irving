import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './contentHeader.css';

const ContentHeader = (props) => {
  const { title, publishDate } = props;
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.publishDate}>{publishDate}</div>
    </div>
  );
};

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(ContentHeader);
