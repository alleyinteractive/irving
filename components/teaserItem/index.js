import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';

// Styles
import styles from './teaserItem.css';

const TeaserItem = ({
  excerpt, permalink, title, children,
}) => {
  const image = findChildByName('image', children);
  return (
    <Link className={styles.wrapper} to={permalink}>
      <div className={styles.meta}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
      {image && <div className={styles.image}>{image}</div>}
    </Link>
  );
};

TeaserItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  excerpt: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(TeaserItem);
