import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

import styles from './eventsPromoModule.css';

const EventsPromoModule = ({
  children,
}) => {
  console.log('fu');
  return (
    <div
      className={styles.contentWrapper}
    >
      {children}
    </div>
  );
};

EventsPromoModule.propTypes = {
  children: PropTypes.object.isRequired,
};

export default (withStyles(styles)(EventsPromoModule));
