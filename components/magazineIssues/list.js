import React, { useEffect } from 'react';
// import toReactElement from 'utils/toReactElement';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import styles from './magazineIssues.css';

const MagazineIssuesList = ({
  data,
  setData,
  lastUpdate,
}) => {
  useEffect(() => {
    const isNewData = lastUpdate !== data;
    const isFinalUpdate = isNewData && 10 > data.length;

    if (isFinalUpdate) {
      setData(data, false);
    } else if (isNewData && 0 < data.length) {
      setData(data, true);
    }
  }, [data]);

  return <span className={styles.hidden}>Updated</span>;
};

MagazineIssuesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdate: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
};

export default withStyles(styles)(MagazineIssuesList);
