import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { UIDReset, UIDConsumer } from 'react-uid';

// Styles
import styles from './listMenuItems.css';

const ListMenuItems = ({ children, title }) => (
  <UIDReset>
    <UIDConsumer>
      {(id, uid) => {
        const listMenuItemsID = uid('list-menu-items');
        return (
          <li className={styles.wrapper}>
            <h3 id={listMenuItemsID}>
              <button type="button">{title}</button>
            </h3>
            <ul aria-labelledby={listMenuItemsID}>{children}</ul>
          </li>
        );
      }}
    </UIDConsumer>
  </UIDReset>
);

ListMenuItems.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListMenuItems);
