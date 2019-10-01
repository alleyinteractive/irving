import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';

// Styles
import styles from './listItem.css';

const ListItem = ({
  firstName,
  lastName,
  subtitle,
  children,
  permalink,
}) => {
  const image = findChildByName('image', children);
  return (
    <li className={styles.wrapper}>
      <Link className={styles.link} to={permalink}>
        <div className={styles.meta}>
          <h3 className={styles.name}>
            {firstName} {lastName}
          </h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.image}>{image}</div>
      </Link>
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListItem);
