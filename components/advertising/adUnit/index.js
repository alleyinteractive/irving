import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';

import styles from './adUnit.css';

const AdUnit = ({ title }) => (
  <div className={styles.adUnit}>
    {__('Ad unit placeholder', 'mittr')}
    {title && (
      <div>{title}</div>
    )}
  </div>
);

AdUnit.defaultProps = {
  title: '',
};

AdUnit.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(AdUnit);
