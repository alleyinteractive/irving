import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import withData from 'components/hoc/withData';
import toReactElement from 'utils/toReactElement';
import PodcastData from './podcastData';

import styles from './podcastList.css';

const PodcastList = ({ podcastName }) => {
  const [data, setData] = useState({
    episodes: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });

  const [endpointData, setEndpointData] = useState({
    currentPage: 1,
    endpoint: `?page=1&podcast_name=${podcastName}`,
  });

  const loadItems = () => {
    const { endpoint, currentPage } = endpointData;

    setEndpointData({
      currentPage: currentPage + 1,
      endpoint: endpoint.replace(/(page)=[^?&]+/, `$1=${currentPage + 1}`),
    });
  };

  const appendEpisodes = (newData, shouldDisplayLoadMore) => {
    setData({
      episodes: [...data.episodes, ...newData],
      lastUpdate: newData,
      shouldDisplayLoadMore,
    });
  };

  const Results = withData(`podcasts${endpointData.endpoint}`, {})(
    PodcastData
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.episodes.map((episode) => (
            toReactElement(episode, episode.config.title, {})
          ))}
        </ul>

        <Results
          setData={appendEpisodes}
          lastUpdate={data.lastUpdate || []}
        />

        {data.shouldDisplayLoadMore && (
          <button className={styles.button} type="button" onClick={loadItems}>
            {__('Load more past episodes', 'mittr')}
          </button>
        )}
      </div>
    </div>
  );
};

PodcastList.propTypes = {
  podcastName: PropTypes.string.isRequired,
};

export default withStyles(styles)(PodcastList);
