import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { UIDReset, UIDConsumer } from 'react-uid';
// import useBreakpoint from 'hooks/useBreakpoint';
import classNames from 'classnames';

// Styles
import styles from './listMenuItems.css';

const ListMenuItems = ({ children, title, desktopOnly }) => {
  // Only show component if there are menu items.
  if (0 === children.length) {
    return null;
  }

  const [isExpanded, setIsExpanded] = useState(false);
  let timeoutID;

  /**
   * When keyboard focus leaves the menu.
   */
  const onBlur = () => {
    timeoutID = setTimeout(() => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    }, 0);
  };

  /**
   * When the keyboard focus enters the menu.
   */
  const onFocus = () => {
    clearTimeout(timeoutID);
    if (! isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <UIDReset>
      <UIDConsumer>
        {(id, uid) => {
          const listMenuItemsID = uid('list-menu-items');
          return (
            <li
              className={classNames(styles.wrapper, {
                [styles.desktopOnly]: desktopOnly,
              })}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              <h3 id={listMenuItemsID}>
                <button
                  type="button"
                  className={classNames(styles.title, {
                    [styles.titleActive]: isExpanded,
                  })}
                  onClick={() => setIsExpanded(! isExpanded)}
                >
                  {title}
                </button>
              </h3>
              {isExpanded && (
                <ul
                  aria-labelledby={listMenuItemsID}
                  className={styles.list}
                  onBlur={onBlur}
                  onFocus={onFocus}
                >
                  {children}
                </ul>
              )}
            </li>
          );
        }}
      </UIDConsumer>
    </UIDReset>
  );
};

ListMenuItems.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  desktopOnly: PropTypes.bool,
};

ListMenuItems.defaultProps = {
  desktopOnly: false,
};

export default withStyles(styles)(ListMenuItems);
