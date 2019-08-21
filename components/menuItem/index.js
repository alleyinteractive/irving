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
import styles from './menuItem.css';

const MenuItem = (props) => {
  const {
    children, label, themeName, url, theme, useHover,
  } = props;

  const menu = findChildByName('menu', children);
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
            return <h3 className={theme.parent}>{label}</h3>;
          default:
            return (
              <Link className={theme.link} to={url}>
                {label}
              </Link>
            );
        }
      })()}
      {isExpanded && <div className={theme.childMenu}>{menu}</div>}
    </li>
  );
};

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    parent: PropTypes.string,
  }).isRequired,
  useHover: PropTypes.bool,
};

MenuItem.defaultProps = {
  useHover: false,
};

const wrapWithThemes = withThemes('menu', {
  default: styles,
  footer: footerStyles,
  header: headerStyles,
});

const wrapWithStyles = withStyles(styles, footerStyles, headerStyles);

export default wrapWithThemes(wrapWithStyles(MenuItem));
