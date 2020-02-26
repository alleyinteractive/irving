import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import useBreakpoint from 'hooks/useBreakpoint';
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

// Styles
import styles from './header.css';

const Header = (props) => {
  const { homeUrl, children } = props;
  const menu = findChildByName('menu', children);
  const leaderboardAd = findChildByName('ad-unit', children);
  const userGreeting = findChildByName('user-greeting', children);
  const megaMenu = findChildByName('mega-menu', children);
  const [isMobile, setIsMobile] = useState(false);
  const headroomRef = useRef();
  const [currentOpenMenu, setCurrentOpenMenu] = useState('');

  // Redux
  const dispatch = useDispatch();
  const dispatchUpdateHeaderHeight = (ht) => {
    dispatch(actionUpdateHeaderHeight(ht));
  };

  const megaMenuIsExpanded = useSelector((state) => state.visible.megaMenu);

  const toggleMegaMenu = (value, headerValue) => {
    setCurrentOpenMenu(headerValue);
    if (! value) {
      setCurrentOpenMenu('');
    }
    dispatch(actionUpdateVisibility('megaMenu', value));
  };

  // Close menu when keyboard focus leaves it.
  const closeMegaMenu = () => {
    toggleMegaMenu(false);
  };

  const megaMenuRef = useRef(null);
  useKeyboardFocusOutside(megaMenuRef, closeMegaMenu);

  // Breakpoints
  const isSmMin = useBreakpoint('smMin');

  // When resizing, do not have the click to expand controls on desktop.
  useEffect(() => {
    if (! isSmMin) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    const headroomHeight = headroomRef.current.getBoundingClientRect().height;
    dispatchUpdateHeaderHeight(headroomHeight);
  });

  // eslint-disable-next-line arrow-body-style
  const HeaderMarkup = ({
    isHeadroom, headerName, isExpanded, className,
  }) => (
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
                [styles.expandedButton]: isExpanded,
              })}
              type="button"
              onClick={() => toggleMegaMenu(! isExpanded, headerName)}
            >
              <span className="screen-reader-text">
                {isExpanded ?
                  __('Close menu', 'mittr') :
                  __('Expand menu', 'mittr')}
              </span>
              <span aria-hidden="true" className={styles.buttonVisualContent}>
                {isExpanded ? 'Close' : <MegaMenuIcon />}
              </span>
            </button>
            {('default' === currentOpenMenu && isExpanded) && (
              <div ref={megaMenuRef} className={styles.megaMenu}>
                {megaMenu}
              </div>
            )}
            {('headroom' === currentOpenMenu && isExpanded) && (
              <div ref={megaMenuRef} className={styles.megaMenu}>
                {megaMenu}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  HeaderMarkup.propTypes = {
    className: PropTypes.string,
    headerName: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    isHeadroom: PropTypes.bool,
  };

  HeaderMarkup.defaultProps = {
    isHeadroom: false,
    className: '',
  };

  return (
    <>
      <HeaderMarkup
        isHeadroom={false}
        isExpanded={'default' === currentOpenMenu && megaMenuIsExpanded}
        headerName="default"
      />
      {/* Only show headroom is scroll position is 260px down the page. */}
      <Headroom
        disableInlineStyles
        aria-hidden
        pinStart={isMobile ? 60 : 260}
      >
        <HeaderMarkup
          className={styles.headroom}
          isHeadroom
          isExpanded={'headroom' === currentOpenMenu && megaMenuIsExpanded}
          headerName="headroom"
        />
      </Headroom>
    </>
  );
};

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  homeUrl: PropTypes.string.isRequired,
};

export default withStyles(styles)(Header);
