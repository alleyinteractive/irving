import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName, filterChildrenByName } from 'utils/children';

// Styles
import styles from './megaMenu.css';

const MegaMenu = (props) => {
  const { children } = props;
  const searchBar = findChildByName('search-bar', children);
  const userGreeting = findChildByName('user-greeting', children);
  const menus = filterChildrenByName('menu', children);
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.searchBar}>{searchBar}</div>
        <div className={styles.userGreeting}>{userGreeting}</div>
      </div>
      <div className={styles.middleRow}>{menus[0]}</div>
      <div className={styles.lastRow}>{menus[1]}</div>
    </div>
  );
};

MegaMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(MegaMenu);
