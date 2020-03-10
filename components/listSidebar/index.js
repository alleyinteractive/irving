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
      <ul>
        <li>
          <Link to={rankLink}>
            {__('Rank', 'mittr')}
          </Link>
        </li>
        <li>
          <Link to={nameLink}>
            {__('Name', 'mittr')}
          </Link>
        </li>
        <li>
          <Link to={locationLink}>
            {__('Location', 'mittr')}
          </Link>
        </li>
        <li>
          <Link to={yearsonLink}>
            {__('Years on List', 'mittr')}
          </Link>
        </li>
      </ul>
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
