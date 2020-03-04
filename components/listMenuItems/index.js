import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { UIDReset, UIDConsumer } from 'react-uid';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';

// Styles
import styles from './listMenuItems.css';
import lightTheme from './listMenuItems--light.css';

const ListMenuItems = ({
  children, title, desktopOnly, theme,
}) => {
  // Only show component if there are menu items.
  if (0 === children.length) {
    return null;
  }

  const [isExpanded, setIsExpanded] = useState(false);
  let timeoutID;

  const useFourColumnLayout = 30 < children.length;

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
              className={classNames(theme.wrapper, {
                [theme.desktopOnly]: desktopOnly,
              })}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              <h3 id={listMenuItemsID}>
                <button
                  type="button"
                  className={classNames(theme.title, {
                    [theme.titleActive]: isExpanded,
                  })}
                  onClick={() => setIsExpanded(! isExpanded)}
                >
                  {title}
                </button>
              </h3>
              {isExpanded && (
                <ul
                  aria-labelledby={listMenuItemsID}
                  className={classNames(theme.list, {
                    [theme.fourColumnList]: useFourColumnLayout,
                  })}
                  onBlur={onBlur}
                  onFocus={onFocus}
                >
                  {children.map(
                    (child) => (useFourColumnLayout ?
                      {
                        ...child,
                        props: {
                          ...child.props,
                          noBorder: true,
                        },
                      } :
                      child)
                  )}
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
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    desktopOnly: PropTypes.string,
    title: PropTypes.string,
    titleActive: PropTypes.string,
    list: PropTypes.string,
  }).isRequired,
};

ListMenuItems.defaultProps = {
  desktopOnly: false,
};

export default withThemes('list-menu-items', {
  default: styles,
  light: lightTheme,
})(withStyles(styles, lightTheme)(ListMenuItems));
