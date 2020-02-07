import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import withData from 'components/hoc/withData';
import toReactElement from 'utils/toReactElement';
import PodcastData from './podcastData';

import styles from './podcastList.css';

const PodcastList = ({ podcastName }) => {
  const [episodes, setEpisodes] = useState({
    episodes: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    endpoint: `?page=1&podcast_name=${podcastName}`,
  });

  const loadItems = () => {
    const { endpoint, currentPage } = userRequest;

    setUserRequest({
      currentPage: currentPage + 1,
      endpoint: endpoint.replace(/(page)=[^?&]+/, `$1=${currentPage + 1}`),
    });
  };

  const appendEpisodes = (newData, shouldDisplayLoadMore) => {
    // Ensure that there are no duplicate year cards rendered to the episodes list.
    setEpisodes({
      episodes: [...episodes.episodes, ...newData].filter((issue, index, self) => ( // eslint-disable-line
        index === self.findIndex((i) => (
          i.config.title === issue.config.title
        ))
      )),
      lastUpdate: newData,
      shouldDisplayLoadMore,
    });
  };

  const Results = withData(`podcasts${userRequest.endpoint}`, {})(
    PodcastData
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {episodes.episodes.map((issue) => (
            <li key={issue.config.title} className={styles.item}>
              {toReactElement(issue)}
            </li>
          ))}
        </ul>

        <Results
          setData={appendEpisodes}
          lastUpdate={episodes.lastUpdate || []}
        />

        {episodes.shouldDisplayLoadMore && (
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
