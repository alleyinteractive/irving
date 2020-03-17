import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Heading from 'components/helpers/heading';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './listSidebar.css';

const ListSidebar = (props) => {
  const {
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
      <Heading
        tag="h3"
        className={styles.listHeading}
      >
        {__('Sort by', 'mittr')}
      </Heading>
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

ListSidebar.propTypes = {
  locationLink: PropTypes.string.isRequired,
  nameLink: PropTypes.string.isRequired,
  rankLink: PropTypes.string.isRequired,
  yearsonLink: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListSidebar);
