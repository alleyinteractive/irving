import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import styles from './sectionItem.css';

const SectionItem = ({ name, link }) => (
  <li className={styles.listItem}>
    <Link to={link} className={styles.link}>{name}</Link>
  </li>
);

SectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(SectionItem);
