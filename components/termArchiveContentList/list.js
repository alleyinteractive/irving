import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

import styles from './termArchiveContentList.css';

const ContentList = ({ data, setData, lastUpdate }) => {
  useEffect(() => {
    if (lastUpdate !== data && 0 < data.length) {
      setData(data);
    }
  }, [data]);

  return <span className={styles.hidden}>Updated</span>;
};

ContentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdate: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContentList);
