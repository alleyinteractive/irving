import React, { useEffect } from 'react';
// import toReactElement from 'utils/toReactElement';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import styles from './magazineIssues.css';

const MagazineIssuesList = ({
  data,
  setData,
  lastUpdate,
  currentPage,
}) => {
  useEffect(() => {
    if (lastUpdate !== data && 0 < data.length) {
      if (5 > data.length && 1 < currentPage) {
        setData(data, false);
      } else {
        setData(data, true);
      }
    }
  }, [data]);

  return <span className={styles.hidden}>Updated</span>;
};

MagazineIssuesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdate: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default withStyles(styles)(MagazineIssuesList);
