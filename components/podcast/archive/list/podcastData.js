import React, { useEffect } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import styles from './podcastList.css';

const PodcastData = ({
  data,
  setData,
  lastUpdate,
}) => {
  useEffect(() => {
    if (lastUpdate !== data && 0 < data.length) {
      if (6 > data.length) {
        setData(data, false);
      } else {
        setData(data, true);
      }
    }
  }, [data]);

  return <span className={styles.updatedText}>Updated</span>;
};

PodcastData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdate: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
};

export default withStyles(styles)(PodcastData);
