import React from 'react';
import toReactElement from 'utils/toReactElement';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import styles from './magazineIssues.css';

const MagazineIssuesList = ({ data, labelID }) => (
  <ul className={styles.list} aria-labelledby={labelID}>
    {data.map((item) => (
      <li key={item.config.title} className={styles.item}>
        {toReactElement(item)}
      </li>
    ))}
  </ul>
);
MagazineIssuesList.propTypes = {
  labelID: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(MagazineIssuesList);
