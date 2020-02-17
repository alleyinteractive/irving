import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import withData from 'components/hoc/withData';
import Button from 'components/helpers/button';
import toReactElement from 'utils/toReactElement';
import PodcastData from './podcastData';

import styles from './podcastList.css';

const Loading = () => (
  <div className={styles.loadMoreIndicator}>Loading...</div>
);

const PodcastList = ({ podcastName }) => {
  const [data, setData] = useState({
    episodes: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });

  const [endpointData, setEndpointData] = useState({
    page: 1,
    name: podcastName,
  });

  const loadItems = () => {
    setEndpointData({
      ...endpointData,
      page: endpointData.page + 1,
    });
  };

  const appendEpisodes = (newData, shouldDisplayLoadMore) => {
    setData({
      episodes: [...data.episodes, ...newData],
      lastUpdate: newData,
      shouldDisplayLoadMore,
    });
  };

  const Data = withData(
    `podcasts?page=${endpointData.page}&podcast_name=${endpointData.name}`,
    {
      loading: () => <Loading />,
    }
  )(PodcastData);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.episodes.map((episode) => (
            toReactElement(episode, episode.config.title)
          ))}
        </ul>

        <div className={styles.loadMoreWrapper}>
          <Data
            setData={appendEpisodes}
            lastUpdate={data.lastUpdate || []}
          />

          {data.shouldDisplayLoadMore && (
            <Button
              className={styles.loadMoreButton}
              buttonStyle="primary"
              onClick={loadItems}
            >
              {__('Load more episodes', 'mittr')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

PodcastList.propTypes = {
  podcastName: PropTypes.string.isRequired,
};

export default withStyles(styles)(PodcastList);
