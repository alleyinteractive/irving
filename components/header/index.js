import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import useBreakpoint from 'hooks/useBreakpoint';

// Images
import LogoStacked from 'assets/icons/logoStacked.svg';
import LogoHorizontal from 'assets/icons/logoHorizontal.svg';
import TRGlyph from 'assets/icons/trGlyph.svg';
import MegaMenuIcon from 'assets/icons/megaMenu.svg';

// Styles
import styles from './header.css';

const Header = ({ homeUrl, children }) => {
  const menu = findChildByName('menu', children);
  const userGreeting = findChildByName('user-greeting', children);
  const megaMenu = findChildByName('mega-menu', children);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Breakpoints
  const isSmMin = useBreakpoint('smMin');

  // When resizing, do not have the click to expand controls on desktop.
  useEffect(() => {
    if (! isSmMin) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isSmMin]);

  const HeaderMarkup = ({ isHeadroom }) => (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        {! isHeadroom && ! isMobile && (
          <div className={styles.leaderboardRow}>
            {/* @todo consider moving ad placeholder to its own component. */}
            <div className={styles.leaderboard}>Advertisement placeholder</div>
          </div>
        )}
        <Link to={homeUrl} className={styles.logo}>
          <div className="screen-reader-text">
            {__('MIT Technology Review')}
          </div>
          {! isHeadroom && (
            <div className={styles.logoStacked} aria-hidden>
              <LogoStacked />
            </div>
          )}
          {(isHeadroom || isMobile) && (
            <>
              <span className={styles.logoT} aria-hidden>
                <TRGlyph />
              </span>
              <div className={styles.logoHorizontal} aria-hidden>
                <LogoHorizontal />
              </div>
            </>
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
              onClick={() => setIsExpanded(! isExpanded)}
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
            {isExpanded && <div className={styles.megaMenu}>{megaMenu}</div>}
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
