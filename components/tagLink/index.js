import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './tagLink.css';
import Link from '../helpers/link';

const TagLink = ({ name, url }) => (
  <li className={styles.inline}>
    <Link to={url}>{name}</Link>
  </li>
);

TagLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(TagLink);
