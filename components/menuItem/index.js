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
    children, label, themeName, url, theme,
  } = props;

  const menu = findChildByName('menu', children);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Breakpoints
  const isSmMin = useBreakpoint('smMin');

  // When resizing, do not have the click to expand controls on desktop.
  useEffect(() => {
    if (isSmMin) {
      setIsExpanded(true);
      setIsDesktop(true);
    } else {
      setIsExpanded(false);
      setIsDesktop(false);
    }
  }, [isSmMin]);

  return (
    <li
      className={classNames(theme.wrapper, styles[themeName], {
        [theme.hasChildren]: menu,
        [theme.isChildless]: ! menu,
      })}
    >
      {(() => {
        switch (true) {
          case menu && ! isDesktop:
            return (
              <button
                onClick={() => setIsExpanded(! isExpanded)}
                type="button"
                aria-expanded={isExpanded}
                aria-disabled={isDesktop}
                className={classNames(theme.parent, {
                  [theme.isExpanded]: isExpanded,
                })}
              >
                {label}
              </button>
            );
          case menu && isDesktop:
            return <div className={theme.parent}>{label}</div>;
          default:
            return (
              <Link className={theme.link} to={url}>
                {label}
              </Link>
            );
        }
      })()}
      {isExpanded && menu}
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
};

const wrapWithThemes = withThemes('menu', {
  default: styles,
  footer: footerStyles,
  header: headerStyles,
});

const wrapWithStyles = withStyles(styles, footerStyles);

export default wrapWithThemes(wrapWithStyles(MenuItem));
