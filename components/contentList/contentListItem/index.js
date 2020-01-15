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
    <li className="contentListItem__wrap">
      {title && (
        <h3 className="contentListItem__title">{parseHTML(title)}</h3>
      )}
      {description && (
        <span className="contentListItem__description">
          {parseHTML(description)}
        </span>
      )}
    </li>
  );
};

ContentListItem.defaultProps = {
  title: '',
  description: '',
};

ContentListItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default withStyles(styles)(ContentListItem);
