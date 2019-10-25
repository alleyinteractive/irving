/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import { findChildByName } from 'utils/children';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import useBreakpoint from 'hooks/useBreakpoint';

// Styles
import footerStyles from './footerMenuItem.css';
import headerStyles from './headerMenuItem.css';
import topStyles from './topMenuItem.css';
import sidebarStyles from './sidebarMenuItem.css';
import styles from './menuItem.css';

const MenuItemStatic = (props) => {
  const {
    isCurrentPage, label, themeName, url, theme, useHover,
  } = props;

  const menu = false;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Breakpoints
  const isSmMin = useBreakpoint('smMin');

  // When resizing, do not have the click to expand controls on desktop.
  useEffect(() => {
    if (isSmMin && ! useHover) {
      setIsExpanded(true);
      setIsDesktop(true);
    } else {
      setIsExpanded(false);
      setIsDesktop(false);
    }
  }, [isSmMin]);

  // If use hover is selected, when you click or hover in desktop mode,
  // the dropdown should appear.

  return (
    <li
      className={classNames(theme.wrapper, styles[themeName], {
        [theme.hasChildren]: menu,
        [theme.isChildless]: ! menu,
      })}
      onMouseEnter={() => (useHover ? setIsExpanded(true) : null)}
      onMouseLeave={() => (useHover ? setIsExpanded(false) : null)}
    >
      {(() => {
        switch (true) {
          case menu && ! isDesktop:
            return (
              <button
                onClick={() => setIsExpanded(! isExpanded)}
                type="button"
                aria-expanded={isExpanded}
                className={classNames(theme.parent, {
                  [theme.isExpanded]: isExpanded,
                })}
              >
                {label}
              </button>
            );
          case menu && isDesktop:
            return <h3 className={theme.heading}>{label}</h3>;
          default:
            return (
              // eslint-disable-next-line max-len
              <Link className={classNames(theme.link, (isCurrentPage) ? theme.chosen : '')} to={url}>
                {label}
              </Link>
            );
        }
      })()}
      {isExpanded && menu && <div className={theme.childMenu}>{menu}</div>}
    </li>
  );
};

MenuItemStatic.propTypes = {
  isCurrentPage: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    parent: PropTypes.string,
  }).isRequired,
  useHover: PropTypes.bool,
};

MenuItemStatic.defaultProps = {
  useHover: false,
};

const wrapWithThemes = withThemes('menu', {
  default: styles,
  footer: footerStyles,
  header: headerStyles,
  top: topStyles,
  sidebar: sidebarStyles,
});

const wrapWithStyles = withStyles(styles, footerStyles,
  headerStyles, topStyles);

export default wrapWithThemes(wrapWithStyles(MenuItemStatic));
