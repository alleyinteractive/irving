import React, { useEffect } from 'react';
import toReactElement from 'utils/toReactElement';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import styles from './magazineIssues.css';

const MagazineIssuesList = ({
  data, labelID, issues, setData, lastUpdate,
}) => {
  useEffect(() => {
    if (lastUpdate !== data && 0 < data.length) {
      setData(data);
    }
  }, [data]);

  return (
    <ul className={styles.list} aria-labelledby={labelID}>
      {issues.map((issue) => (
        <li key={issue.config.title} className={styles.item}>
          {toReactElement(issue)}
        </li>
      ))}
    </ul>
  );
};
MagazineIssuesList.propTypes = {
  labelID: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdate: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
};

export default withStyles(styles)(MagazineIssuesList);
