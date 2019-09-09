import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';

// Styles
import styles from './listMenuItem.css';

const ListMenuItem = ({ title, url }) => (
  <li className={styles.wrapper}>
    <Link to={url}>{title}</Link>
  </li>
);

ListMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListMenuItem);
