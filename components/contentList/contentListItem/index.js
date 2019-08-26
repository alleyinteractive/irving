import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';
import styles from './contentListItem.css';

const ContentListItem = ({ title, url, description }) => (
  <li className={styles.listItemWrap}>
    {url ? (
      <a href={url}>
        <h5 className={styles.listItemTitle}>{title}</h5>
      </a>
    ) : (
      <h5 className={styles.listItemTitle}>{title}</h5>
    )}
    <RawHTML content={description} />
  </li>
);

ContentListItem.defaultProps = {
  url: '',
};

ContentListItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(ContentListItem);
