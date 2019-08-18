import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { findChildByName } from 'utils/children';

// Logo
import LogoStacked from 'assets/icons/logoStacked.svg';

// Styles
import styles from './header.css';

const Header = ({ homeUrl, children }) => {
  const menu = findChildByName('menu', children);
  const userGreeting = findChildByName('user-greeting', children);
  const megaMenu = findChildByName('mega-menu', children);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leaderboardRow}>
          {/* @todo consider moving ad placeholder to its own component */}
          <div className={styles.leaderboard}>Advertisement placeholder</div>
        </div>
        <a href={homeUrl} className={styles.logo}>
          <div className="screen-reader-text">
            {__('MIT Technology Review')}
          </div>
          <div className={styles.logoStacked}>
            <LogoStacked />
          </div>
        </a>
        <div className={styles.navigation}>
          <div className={styles.userGreeting}>{userGreeting}</div>
          <div className={styles.menu}>
            {menu}
            <button type="button" onClick={() => setIsExpanded(! isExpanded)}>
              {isExpanded ?
                __('Close menu', 'mittr') :
                __('Expand menu', 'mittr')}
            </button>
            {isExpanded && <div className={styles.megaMenu}>{megaMenu}</div>}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  homeUrl: PropTypes.string.isRequired,
};

export default Header;
