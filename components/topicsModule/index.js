import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from '../helpers/link';

// Themes.
import styles from './topicsModule.css';

const TopicsModule = ({
  topics,
}) => {
  const [TopicsToRender, setTopicsToRender] = useState(true);
  useEffect(() => {
    const windowSizeChanged = () => setTopicsToRender(
      (700 <= window.innerHeight)
    );
    windowSizeChanged();
    window.addEventListener('resize', windowSizeChanged);
  }, []);

  const Topics = (
    <div className={styles.wrapper}>
      {TopicsToRender}
      <span className={styles.title}>{__('Topics', 'mittr')}</span>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link to={topic.url} className={styles.link}>{topic.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return TopicsToRender ? Topics : null;
};

TopicsModule.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default (withStyles(styles)(TopicsModule));
