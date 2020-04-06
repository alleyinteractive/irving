import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import useKeyboardFocusOutside from 'hooks/useKeyboardFocusOutside';
import useHideAds from 'hooks/useHideAds';
import {
  actionUpdateHeaderHeight,
  actionUpdateVisibility,
} from 'actions';

// Images
import LogoStacked from 'assets/icons/logoStacked.svg';
import LogoHorizontal from 'assets/icons/logoHorizontal.svg';
import TRGlyph from 'assets/icons/trGlyph.svg';
import MegaMenuIcon from 'components/megaMenuIcon';

import styles from './headerTemplate.css';

const HeaderTemplate = ({
  children,
  isHeadroom,
  isMobile,
  homeUrl,
}) => {
  const menu = findChildByName('menu', children);
  const leaderboardAd = findChildByName('ad-unit', children);
  const userGreeting = findChildByName('user-greeting', children);
  const megaMenu = findChildByName('mega-menu', children);
  const hideAds = useHideAds();
  const [isExpanded, setIsExpanded] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const headroomRef = useRef();

  // Redux
  const dispatch = useDispatch();
  const dispatchUpdateHeaderHeight = (ht) => {
    dispatch(actionUpdateHeaderHeight(ht));
  };

  const megaMenuIsExpanded = useSelector((state) => state.visible.megaMenu);

  const toggleMegaMenu = (value) => {
    dispatch(actionUpdateVisibility('megaMenu', value));
    setIsExpanded(value);
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
      className={classNames(styles.container)}
      ref={isHeadroom ? headroomRef : null}
    >
      <div className={classNames(styles.leaderboardRow, {
        [styles.displayNone]: isHeadroom || isMobile,
        [styles.hideAds]: hideAds,
      })}
      >
        {leaderboardAd}
      </div>
      <div className={classNames(styles.wrapper, {
        [styles.isHeadroom]: isHeadroom,
      })}
      >
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
        <div className={classNames(styles.navigation, {
          [styles.isHeadroom]: isHeadroom,
        })}
        >
          {! isHeadroom && (
            <div className={styles.userGreeting}>{userGreeting}</div>
          )}
          <div className={styles.menuRow}>
            <div className={styles.menu}>
              {menu}
            </div>
            <button
              className={classNames(styles.button, {
                [styles.expandedButton]: megaMenuIsExpanded,
              })}
              style={{
                background: iconHovered && ! megaMenuIsExpanded ?
                  '#000' : '#fff',
              }}
              type="button"
              onClick={() => toggleMegaMenu(! megaMenuIsExpanded)}
              onMouseOver={() => setIconHovered(true)}
              onMouseOut={() => setIconHovered(false)}
              onBlur={() => setIconHovered(false)}
              onFocus={() => setIconHovered(true)}
            >
              <span className="screen-reader-text">
                {megaMenuIsExpanded ?
                  __('Close menu', 'mittr') :
                  __('Expand menu', 'mittr')}
              </span>
              <span aria-hidden="true" className={styles.buttonVisualContent}>
                {megaMenuIsExpanded ?
                  'Close' : <MegaMenuIcon hovered={iconHovered} />}
              </span>
            </button>
            {(isExpanded) && (
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
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isHeadroom: PropTypes.bool.isRequired,
  homeUrl: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withStyles(styles)(HeaderTemplate);
