import React from 'react';
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

  return (
    <section className={styles.wrapper}>
      <Heading
        tag="h3"
        className={styles.listLabel}
      >
        {__('Sort by', 'mittr')}
      </Heading>
      <nav className={styles.listSidebarNav}>
        <ul>
          <li>
            <Link to={rankLink} className={styles.listSidebarNavLink}>
              {__('Rank', 'mittr')}
            </Link>
          </li>
          <li>
            <Link to={nameLink} className={styles.listSidebarNavLink}>
              {__('Name', 'mittr')}
            </Link>
          </li>
          <li>
            <Link to={locationLink} className={styles.listSidebarNavLink}>
              {__('Location', 'mittr')}
            </Link>
          </li>
          <li>
            <Link to={yearsonLink} className={styles.listSidebarNavLink}>
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
