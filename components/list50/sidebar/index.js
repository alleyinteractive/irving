import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

  const links = [locationLink, nameLink, rankLink, yearsonLink];
  const [currentSort, setCurrentSort] = useState(false);

  /**
   * On page load, set the default sort to true.
   */
  useEffect(() => {
    const currentHref = links.find((link) => (
      link === window.location.href
    ));

    setCurrentSort(currentHref || rankLink);
  }, []);

  return (
    <section className={styles.wrapper}>
      {children}
      <nav className={styles.listSidebarNav}>
        <ul>
          <li>
            <Link
              to={rankLink}
              className={classNames({
                [styles.active]: rankLink === currentSort,
              })}
            >
              {__('Rank', 'mittr')}
            </Link>
          </li>
          <li>
            <Link
              to={nameLink}
              className={classNames({
                [styles.active]: nameLink === currentSort,
              })}
            >
              {__('Name', 'mittr')}
            </Link>
          </li>
          <li>
            <Link
              to={locationLink}
              className={classNames({
                [styles.active]: locationLink === currentSort,
              })}
            >
              {__('Location', 'mittr')}
            </Link>
          </li>
          <li>
            <Link
              to={yearsonLink}
              className={classNames({
                [styles.active]: yearsonLink === currentSort,
              })}
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
