import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { UIDReset, UIDConsumer } from 'react-uid';
// import useBreakpoint from 'hooks/useBreakpoint';
import classNames from 'classnames';

// Styles
import styles from './listMenuItems.css';

const ListMenuItems = ({ children, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isManagingFocus, setIsManagingFocus] = useState(false);
  let timeoutID;
  // const isManagingFocusRef = useRef(isManagingFocus);
  // const [isDesktop, setIsDesktop] = useState(false);

  // Breakpoints
  // const isSmMin = useBreakpoint('smMin');

  // // When resizing, do not have the click to expand controls on desktop.
  // useEffect(() => {
  //   if (isSmMin) {
  //     setIsExpanded(true);
  //     setIsDesktop(true);
  //   } else {
  //     setIsExpanded(false);
  //     setIsDesktop(false);
  //   }
  // }, [isSmMin]);

  // console.log(isDesktop); // eslint-disable-line

  if (0 === children.length) {
    return null;
  }

  const onBlur = () => {
    timeoutID = setTimeout(() => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    }, 0);
  };

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
              className={styles.wrapper}
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
};

export default withStyles(styles)(ListMenuItems);
