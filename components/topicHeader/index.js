import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './topicHeader.css';

const TopicHeader = ({
  name, description, children, color,
}) => {
  const image = findChildByName('image', children);
  const articles = filterChildrenByName(
    'term-archive-pinned-article',
    children
  );
  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={styles.meta}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.image}>{image}</div>
      {articles && (
        <div className={styles.slider}>
          <ol className={styles.list}>
            {articles.map((article, count) => (
              <li className={styles.featured}>
                <div className={styles.counter} aria-hidden>
                  0{count + 1}.
                </div>
                {article}
              </li>
            ))}
          </ol>
          <button type="button">{__('Next', 'mittr')}</button>
          <button type="button">{__('Previous', 'mittr')}</button>
        </div>
      )}
    </header>
  );
};

TopicHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(TopicHeader);
