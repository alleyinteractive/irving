import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findChildByName } from 'utils/children';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from '../hoc/withThemes';

// Styles
import styles from './sidebar.css';
import inFeedStyles from './inFeed.css';

const Sidebar = (props) => {
  const {
    children,
    className,
    // eslint-disable-next-line no-unused-vars
    context,
    hasAd,
    theme,
    themeName,
  } = props;

  const popular = findChildByName('popular', children);
  const magazineModule = findChildByName('magazine-module', children);
  const adUnit = findChildByName('ad-unit', children);

  const [headerHeight, setHeaderHeight] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isMainSidebarFixed, setMainFixedPosition] = useState(false);
  const [isSubSidebarFixed, setSubFixedPosition] = useState(false);
  const [maxWidth, setMaxWidth] = useState(null);
  let sidebarOffset;
  let subSidebarOffset;

  useEffect(() => {
    let height;
    const contentHeader = document.getElementById('content--header');

    if (
      null !== contentHeader &&
      'raised' === theme &&
      960 < window.innerWidth
    ) {
      const headerWrapper =
        document.getElementById('content--header--wrapper');

      // If the wrapper exists, include the bottom margin to be factored
      // into the sidebar's height adjustment.
      if (null !== headerWrapper) {
        const headerMarginBottom = parseInt(
          window
            .getComputedStyle(headerWrapper)
            .getPropertyValue('margin-bottom'),
          10
        );
        height = contentHeader.clientHeight + headerMarginBottom + 15;
      } else {
        height = contentHeader.clientHeight;
      }

      setHeaderHeight(height);
    }

    // The sponsored content module node.
    const sponsoredModule =
      document.getElementById('sponsored-content--module');

    // The post is a sponsored story.
    if (null !== sponsoredModule) {
      const moduleHeight = sponsoredModule.offsetHeight;
      // Margins are not included in the DOM element's offsetHeight, so we'll need
      // to retrieve the computed values.
      const moduleMarginTop = parseInt(
        window
          .getComputedStyle(sponsoredModule)
          .getPropertyValue('margin-top'),
        10
      );
      const moduleMarginBottom = parseInt(
        window
          .getComputedStyle(sponsoredModule)
          .getPropertyValue('margin-bottom'),
        10
      );
      const nextHeight =
        height + moduleHeight + moduleMarginTop + moduleMarginBottom;

      setHeaderHeight(nextHeight);
    }
  }, headerHeight);

  /**
   * Listen for scroll events and position accordingly
   */
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (960 < window.innerWidth) {
        const currentOffset = document.documentElement.scrollTop;

        const sidebarNode = document.getElementById('sidebar');
        const subSidebarNode = document.getElementById('subSidebar');

        // Set position for either main sidebar or sub.
        const setPosition = (forMain) => {
          if (forMain) {
            if (currentOffset > (sidebarOffset - 100)) {
              setMainFixedPosition(true);
            } else {
              setMainFixedPosition(false);
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (currentOffset > (subSidebarOffset - 100)) {
              setSubFixedPosition(true);
            } else {
              setSubFixedPosition(false);
            }
          }
        };

        if (sidebarOffset === undefined) {
          sidebarOffset = sidebarNode.getBoundingClientRect().top +
            window.scrollY;

          // Make sure that the fixed position sidebar is never wider than its parent.
          const sidebarStyle = window.getComputedStyle(sidebarNode, null);
          const sidebarWidth = sidebarStyle.getPropertyValue('width');
          setMaxWidth(sidebarWidth);

          setPosition(true);
        }

        if (subSidebarOffset === undefined) {
          if (subSidebarNode) {
            subSidebarOffset = subSidebarNode.getBoundingClientRect().top +
              window.scrollY;
          }
          setPosition(false);
        }

        const contentNode = document.getElementById('content--body');

        if (null !== contentNode) {
          const nodeHeight = contentNode.clientHeight;

          if (400 < nodeHeight || 'list' === themeName) {
            setPosition(true);
          }
        }

        if ('inFeed' === themeName) {
          setPosition(false);
        }

        if ('inFeed' !== themeName) {
          setPosition(true);
        }
      }
    });
  }, isSubSidebarFixed);

  return (
    <aside
      className={classNames(className, theme.wrapper, themeName, {
        [styles.hasAd]: hasAd,
      })}
      id="sidebar"
      style={{
        position: isMainSidebarFixed ? 'fixed' : 'relative',
        top: isMainSidebarFixed ? 100 : 0,
        width: maxWidth,
      }}
    >
      <div className={theme.mainSidebarWrap}>
        {popular && (
          <div className={theme.widgetWrapper}>
            {popular}
          </div>
        )}
        {magazineModule && (
          <div className={theme.widgetWrapper}>
            {magazineModule}
          </div>
        )}
      </div>
      {'inFeed' === themeName && (
        <div
          className={theme.subSidebar}
          id="subSidebar"
          style={{
            position: isSubSidebarFixed ? 'fixed' : 'relative',
            top: isSubSidebarFixed ? 100 : 0,
            width: maxWidth,
          }}
        >
          <div className={theme.subSidebarWrapper}>
            {adUnit}
          </div>
        </div>
      )}
    </aside>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  context: PropTypes.string,
  hasAd: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string,
};

Sidebar.defaultProps = {
  className: '',
  context: '',
  themeName: 'inFeed',
  hasAd: false,
};

export default withThemes('sidebar', {
  default: styles,
  inFeed: inFeedStyles,
})(withStyles(styles, inFeedStyles)(Sidebar));
