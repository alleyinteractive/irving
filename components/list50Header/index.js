import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import setContrast from 'utils/setContrast';
import hexToRgb from 'utils/hexToRgb';

// Styles
import styles from './list50Header.css';

const List50Header = ({
  children,
  color,
  listType,
  textColor,
  year,
}) => {
  const description = findChildByName('list-description', children);
  const menu = findChildByName('list-menu', children);
  const socialSharing = findChildByName('social-sharing', children);
  // If textColor is not being set from post_meta in the api, then set the
  // appropriate text color based on the color.
  const headerTextColor = '' === textColor ?
    setContrast(hexToRgb(color)) : textColor;

  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={styles.container}>
        <div className={styles.meta}>
          <h1
            className={styles.title}
            style={{
              color: headerTextColor,
            }}
          >
            {listType}
            {year && (
              <>
                {'\u00A0'}<span className={styles.year}>{year}</span>
              </>
            )}
          </h1>
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.menus}>
          <div className={styles.menu}>{menu}</div>
          <div className={styles.socialSharing}>{socialSharing}</div>
        </div>
      </div>
    </header>
  );
};

List50Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  year: PropTypes.string.isRequired,
  color: PropTypes.string,
  listType: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

List50Header.defaultProps = {
  color: '#333333',
  textColor: '',
};

export default withStyles(styles)(List50Header);
