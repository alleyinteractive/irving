import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

// Styles
import styles from './innovatorHeader.css';
import colors from '../../config/css/colors';

const InnovatorHeader = ({ children, title, color }) => {
  const description = findChildByName('list-description', children);
  const image = findChildByName('image', children);

  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={styles.container}>
        {image && <div className={styles.image}>{image}</div>}
        <div className={classNames(styles.meta, {
          [styles.withImg]: image,
        })}
        >
          <h1 className={styles.title}>
            {__('35 Innovators Under 35', 'mittr')}
            <span className={styles.inlineTitle}>{title}</span>
          </h1>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </header>
  );
};

InnovatorHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

InnovatorHeader.defaultProps = {
  color: colors['tr35-list-header-bg'],
};

export default withStyles(styles)(InnovatorHeader);
