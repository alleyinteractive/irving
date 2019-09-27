import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import kebabcase from 'lodash.kebabcase';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './magazineIssues.css';

const MagazineIssues = ({ children, title }) => (
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
        {children.map((child) => (
          <li key={child.props.title} className={styles.item}>
            {child}
          </li>
        ))}
      </ul>
      <button className={styles.button} type="button">
        {__('Load more past issues', 'mittr')}
      </button>
    </div>
  </div>
);

MagazineIssues.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(MagazineIssues);
