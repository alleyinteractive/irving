import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import useKeyboardFocusOutside from 'hooks/useKeyboardFocusOutside';
import {
  actionUpdateHeaderHeight,
  actionUpdateVisibility,
} from 'actions';

// Images
import LogoStacked from 'assets/icons/logoStacked.svg';
import LogoHorizontal from 'assets/icons/logoHorizontal.svg';
import TRGlyph from 'assets/icons/trGlyph.svg';
import MegaMenuIcon from 'assets/icons/megaMenu.svg';

import styles from './headerTemplate.css';

const HeaderTemplate = ({
  className,
  children,
  isHeadroom,
  isMobile,
  homeUrl,
}) => {
  const menu = findChildByName('menu', children);
  const leaderboardAd = findChildByName('ad-unit', children);
  const userGreeting = findChildByName('user-greeting', children);
  const megaMenu = findChildByName('mega-menu', children);

  const headroomRef = useRef();

  // Redux
  const dispatch = useDispatch();
  const dispatchUpdateHeaderHeight = (ht) => {
    dispatch(actionUpdateHeaderHeight(ht));
  };

  const megaMenuIsExpanded = useSelector((state) => state.visible.megaMenu);

  const toggleMegaMenu = (value) => {
    dispatch(actionUpdateVisibility('megaMenu', value));
  };

  // Close menu when keyboard focus leaves it.
  const closeMegaMenu = () => {
    toggleMegaMenu(false);
  };

  const megaMenuRef = useRef(null);
  useKeyboardFocusOutside(megaMenuRef, closeMegaMenu);

  useEffect(() => {
    if (headroomRef.current) {
      const headroomHeight = headroomRef.current.getBoundingClientRect().height;
      dispatchUpdateHeaderHeight(headroomHeight);
    }
  });
  return (
    <header
      className={classNames(styles.container, className)}
      ref={isHeadroom ? headroomRef : null}
    >
      <div className={styles.wrapper}>
        {! isHeadroom && ! isMobile && (
          <div className={styles.leaderboardRow}>
            {leaderboardAd}
          </div>
        )}
        {(isHeadroom || isMobile) && (
          <Link
            to={homeUrl}
            tabIndex="-1"
            aria-hidden
            className={styles.logoT}
          >
            <TRGlyph />
          </Link>
        )}
        <Link
          to={homeUrl}
          className={classNames(styles.logo, {
            [styles.headroomLogo]: isHeadroom,
          })}
        >
          <div className="screen-reader-text">
            {__('MIT Technology Review')}
          </div>
          {! isHeadroom && (
            <div className={styles.logoStacked} aria-hidden>
              <LogoStacked />
            </div>
          )}
          {(isHeadroom || isMobile) && (
            <div className={styles.logoHorizontal} aria-hidden>
              <LogoHorizontal />
            </div>
          )}
        </Link>
        <div className={styles.navigation}>
          {! isHeadroom && (
            <div className={styles.userGreeting}>{userGreeting}</div>
          )}
          <div className={styles.menuRow}>
            <div className={styles.menu}>{menu}</div>
            <button
              className={classNames(styles.button, {
                [styles.expandedButton]: megaMenuIsExpanded,
              })}
              type="button"
              onClick={() => toggleMegaMenu(! megaMenuIsExpanded)}
            >
              <span className="screen-reader-text">
                {megaMenuIsExpanded ?
                  __('Close menu', 'mittr') :
                  __('Expand menu', 'mittr')}
              </span>
              <span aria-hidden="true" className={styles.buttonVisualContent}>
                {megaMenuIsExpanded ? 'Close' : <MegaMenuIcon />}
              </span>
            </button>
            {megaMenuIsExpanded && (
              <div ref={megaMenuRef} className={styles.megaMenu}>
                {megaMenu}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

HeaderTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isHeadroom: PropTypes.bool.isRequired,
  homeUrl: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

HeaderTemplate.defaultProps = {
  className: '',
};

export default withStyles(styles)(HeaderTemplate);
