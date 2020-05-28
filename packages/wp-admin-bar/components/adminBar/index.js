import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './adminBar.css';

const AdminBar = (props) => {
  const {
    iframeSrc,
  } = props;

  return (
    <iframe
      title="Admin Bar Iframe"
      src={iframeSrc}
      className={styles.iframe}
    />
  );
};

AdminBar.propTypes = {
  /**
   * Source URL for the admin bar iframe.
   */
  iframeSrc: PropTypes.string.isRequired,
};

export default withStyles(styles)(AdminBar);
