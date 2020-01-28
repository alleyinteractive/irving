import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
// Styles
import styles from './hubListItem.css';

const HubListItem = ({
  children,
  eyebrow,
  permalink,
  title,
}) => {
  const description = findChildByName('html', children);
  const image = findChildByName('image', children);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>
            <Link to={permalink}>{title}</Link>
          </h2>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.image}>{image}</div>
      </div>
    </div>
  );
};

HubListItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  eyebrow: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(HubListItem);
