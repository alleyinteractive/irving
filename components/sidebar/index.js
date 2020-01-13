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
    // eslint-disable-next-line no-unused-vars
    theme,
  } = props;

  const popular = findChildByName('popular', children);
  const magazineModule = findChildByName('magazine-module', children);
  const adUnit = findChildByName('ad-unit', children);

  const [headerHeight, setHeaderHeight] = useState(0);

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

  return (
    <aside
      className={classNames(className, theme.wrapper, theme, {
        [styles.hasAd]: hasAd,
      })}
      style={{
        position: 'relative',
        top: `-${headerHeight}px`,
      }}
    >
      {/* {children.map((child) => {
        const {
          props: { gtmTargetingClass },
        } = child;

        return (
          <div
            key={child.key}
            className={styles.item}
            id="sidebar__item"
          >
            {! gtmTargetingClass ?
              cloneElement(child, { gtmTargetingClass: context }) :
              child}
          </div>
        );
      })} */}
      <div className={theme.widgetWrapper}>
        {popular}
      </div>
      <div className={theme.widgetWrapper}>
        {magazineModule}
      </div>
      <div className={theme.subSidebar}>
        <div className={theme.subSidebarWrapper}>
          {adUnit}
        </div>
        <div>
          Another div for testing
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  context: PropTypes.string,
  hasAd: PropTypes.bool,
  theme: PropTypes.string,
};

Sidebar.defaultProps = {
  className: '',
  context: '',
  theme: '',
  hasAd: false,
};

export default withThemes('sidebar', {
  default: styles,
  inFeed: inFeedStyles,
})(withStyles(styles)(Sidebar));
