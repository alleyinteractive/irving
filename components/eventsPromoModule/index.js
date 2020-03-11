import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Heading from 'components/helpers/heading';
import Arrow from 'assets/icons/arrow.svg';
import Link from 'components/helpers/link';
import styles from './eventsPromoModule.css';

const EventsPromoModule = ({
  children,
  heading,
  moreText,
  moreLink,
}) => (
  <div
    className={styles.wrapper}
  >
    <Heading tag="h3" themeName="sidebarWidget">
      {heading}
    </Heading>
    {children}
    <Link to={moreLink} className={styles.moreLink}>
      {moreText}
      <Arrow />
    </Link>
  </div>
);

EventsPromoModule.propTypes = {
  children: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  moreText: PropTypes.string.isRequired,
  moreLink: PropTypes.string.isRequired,
};

export default (withStyles(styles)(EventsPromoModule));
