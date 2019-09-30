import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import kebabcase from 'lodash.kebabcase';
import { __ } from '@wordpress/i18n';
import withData from 'components/hoc/withData';
import toReactElement from 'utils/toReactElement';

// Styles
import styles from './magazineIssues.css';

const MagazineIssues = ({ data, title }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const loadItems = () => {
    setItems(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title} id={kebabcase(title)}>
            {title}
          </h2>
          {/* @todo make this update component on select. */}
          <select className={styles.select}>
            <option value="">Year</option>
            <option value="2000">2000s</option>
            <option value="2010">2010s</option>
            <option value="1990">1990s</option>
          </select>
        </header>
        <ul className={styles.list} aria-labelledby={kebabcase(title)}>
          {items.map((item) => (
            <li key={item.config.title} className={styles.item}>
              {toReactElement(item)}
            </li>
          ))}
        </ul>
        <button className={styles.button} type="button" onClick={loadItems}>
          {__('Load more past issues', 'mittr')}
        </button>
      </div>
    </div>
  );
};

MagazineIssues.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default withData('magazine_issues', {
  loading: () => <div>{__('Loading', 'mittr')}</div>,
})(withStyles(styles)(MagazineIssues));
