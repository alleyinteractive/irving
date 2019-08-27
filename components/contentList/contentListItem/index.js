import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import parseHTML from 'html-react-parser';
import styles from './contentListItem.css';

const ContentListItem = (props) => {
  const {
    title,
    description,
  } = props;
  return (
    <li className={styles.wrap}>
      <h3 className={styles.title}>{parseHTML(title)}</h3>
      <span className={styles.description}>
        {parseHTML(description)}
      </span>
    </li>
  );
};

ContentListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(ContentListItem);
