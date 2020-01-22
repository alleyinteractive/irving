import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './listHeader.css';

const ListHeader = ({ children, title, color }) => {
  const description = findChildByName('list-description', children);
  const menu = findChildByName('list-menu', children);
  const socialSharing = findChildByName('social-sharing', children);
  const image = findChildByName('image', children);

  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={styles.container}>
        <div className={styles.meta}>
          <h1 className={styles.title}>
            {__('35 Innovators Under 35', 'mittr')}
            <span className={styles.inlineTitle}>{title}</span>
          </h1>
          <div className={styles.description}>{description}</div>
        </div>
        {(0 < image.length) && <div className={styles.image}>{image}</div>}
        <div className={styles.menus}>
          <div className={styles.menu}>{menu}</div>
          <div className={styles.socialSharing}>{socialSharing}</div>
        </div>
      </div>
    </header>
  );
};

ListHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

ListHeader.defaultProps = {
  color: '#333333',
};

export default withStyles(styles)(ListHeader);
