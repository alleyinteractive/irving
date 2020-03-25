import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './list50Sidebar.css';

const List50Sidebar = (props) => {
  const {
    children,
    locationLink,
    nameLink,
    rankLink,
    yearsonLink,
  } = props;

  const current = window.location.href;
  const links = [locationLink, nameLink, rankLink, yearsonLink];
  const [defaultSort, setDefaultSort] = useState(false);

  /**
   * On page load, set the default sort to true.
   */
  useEffect(() => {
    if (! links.includes(current)) {
      setDefaultSort(true);
    } else {
      setDefaultSort(false);
    }
  });

  return (
    <section className={styles.wrapper}>
      {children}
      <nav className={styles.listSidebarNav}>
        <ul>
          <li>
            <Link
              to={rankLink}
              className={defaultSort || rankLink === current ?
                styles.active : ''}
            >
              {__('Rank', 'mittr')}
            </Link>
          </li>
          <li>
            <Link
              to={nameLink}
              className={nameLink === current ?
                styles.active : ''}
            >
              {__('Name', 'mittr')}
            </Link>
          </li>
          <li>
            <Link
              to={locationLink}
              className={locationLink === current ?
                styles.active : ''}
            >
              {__('Location', 'mittr')}
            </Link>
          </li>
          <li>
            <Link
              to={yearsonLink}
              className={yearsonLink === current ?
                styles.active : ''}
            >
              {__('Years on List', 'mittr')}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

List50Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  locationLink: PropTypes.string.isRequired,
  nameLink: PropTypes.string.isRequired,
  rankLink: PropTypes.string.isRequired,
  yearsonLink: PropTypes.string.isRequired,
};

export default withStyles(styles)(List50Sidebar);
