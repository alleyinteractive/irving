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
    {}
  )(PodcastData);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.episodes.map((episode, idx) => {
            const index = idx + 1;

            if (0 === idx) {
              return (
                <>
                  <hr className="rowDivider rowDivider--top" />
                  {toReactElement(episode, episode.config.title, {})}
                </>
              );
            }

            if (0 === index % 3) {
              return (
                <>
                  {toReactElement(
                    episode,
                    episode.config.title,
                    { className: 'rowEnd--3up' }
                  )}
                  <hr className="rowDivider rowDivider--3up" />
                </>
              );
            }

            if (0 === index % 2) {
              return (
                <>
                  {toReactElement(
                    episode,
                    episode.config.title,
                    { className: 'rowEnd--2up' }
                  )}
                  <hr className="rowDivider rowDivider--2up" />
                </>
              );
            }

            return toReactElement(episode, episode.config.title,);
          })}
        </ul>

        <Data
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
