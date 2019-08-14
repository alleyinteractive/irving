import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

// Styles
import styles from './byline.css';

// @todo this needs to be refactored to accept a link.
const Byline = ({ name }) => (
  <div className={styles.wrapper}>
    {__('by ', 'mittr')}
    <span className={styles.name}>{name}</span>
  </div>
);

Byline.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Byline;
