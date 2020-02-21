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

  // Redux
  const dispatch = useDispatch();
  const dispatchUpdateHeaderHeight = (ht) => {
    dispatch(actionUpdateHeaderHeight(ht));
  };
  const toggleMegaMenu = (value) => {
    dispatch(actionUpdateVisibility('megaMenu', value));
  };
  const isExpanded = useSelector((state) => state.visible.megaMenu);

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

  const HeaderMarkup = ({ isHeadroom }) => (
    <header
      className={styles.container}
      ref={isHeadroom ? headroomRef : null}
    >
      <div className={styles.wrapper}>
        {! isHeadroom && ! isMobile && (
          <div className={styles.leaderboardRow}>
            {leaderboardAd}
          </div>
        )}
        {(isHeadroom || isMobile) && (
          <Link to={homeUrl} tabIndex="-1" aria-hidden className={styles.logoT}>
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
              onClick={() => toggleMegaMenu(! isExpanded)}
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
            {isExpanded && isHeadroom &&
              <div className={styles.megaMenu}>{megaMenu}</div>
            }
          </div>
        </div>
      </div>
    </header>
  );

  HeaderMarkup.propTypes = {
    isHeadroom: PropTypes.bool,
  };

  HeaderMarkup.defaultProps = {
    isHeadroom: false,
  };

  return (
    <>
      <HeaderMarkup />
      <Headroom
        disableInlineStyles
        aria-hidden
        className={styles.headroom}
        pinStart={isMobile ? 60 : 260}
      >
        <HeaderMarkup className={styles.headroom} isHeadroom />
      </Headroom>
    </>
  );
};

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  homeUrl: PropTypes.string.isRequired,
};

export default withStyles(styles)(Header);
