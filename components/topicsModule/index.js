import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from '../helpers/link';

// Themes.
import styles from './topicsModule.css';

const TopicsModule = ({
  topics,
}) => (
  <div className={styles.wrapper}>
    <span className={styles.title}>{__('Topics', 'mittr')}</span>
    <ul>
      { topics.map((topic) => (
        <li key={topic.id}>
          <Link to={topic.url} className={styles.link}>{topic.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

TopicsModule.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default (withStyles(styles)(TopicsModule));
