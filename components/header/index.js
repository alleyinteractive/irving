/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { withStyles } from 'critical-style-loader/lib';
import useBreakpoint from 'hooks/useBreakpoint';
import HeaderTemplate from 'components/headerTemplate';

// Styles
import styles from './header.css';

const Header = (props) => {
  const { homeUrl, children } = props;
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
  });

  return (
    <>
      <HeaderTemplate
        isHeadroom={false}
        homeUrl={homeUrl}
        isMobile={isMobile}
        children={children}
      />

      <Headroom
        disableInlineStyles
        aria-hidden
        className={styles.headroom}
        pinStart={isMobile ? 60 : 260}
      >
        <HeaderTemplate
          isHeadroom
          homeUrl={homeUrl}
          isMobile={isMobile}
          children={children}
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
