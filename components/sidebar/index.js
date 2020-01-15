import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findChildByName } from 'utils/children';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from '../hoc/withThemes';

// Styles
import styles from './sidebar.css';
import inFeedStyles from './sidebar--inFeed.css';

const Sidebar = (props) => {
  const {
    children,
    className,
    clientID,
    hasAd,
    theme,
    themeName,
  } = props;

  const popular = findChildByName('popular', children);
  const magazineModule = findChildByName('magazine-module', children);
  const adUnit = findChildByName('ad-unit', children);

  return (
    <Fragment>
      <aside
        className={classNames(className, theme.wrapper, {
          [styles.hasAd]: hasAd,
        })}
        id={clientID}
        style={{
          position: 'inFeed' === themeName ? 'relative' : 'sticky',
          top: 'inFeed' === themeName ? 0 : 100,
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
          {(adUnit && 'inFeed' !== themeName) && (
            <div className={theme.widgetWrapper}>
              {adUnit}
            </div>
          )}
        </div>
      </aside>
      {'inFeed' === themeName && (
        <div
          className={theme.subSidebar}
          id="subSidebar"
          style={{
            position: 'sticky',
            top: 100,
          }}
        >
          <div className={theme.subSidebarWrapper}>
            {adUnit}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  clientID: PropTypes.string,
  hasAd: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string,
};

Sidebar.defaultProps = {
  className: '',
  clientID: 'sidebar',
  themeName: 'inFeed',
  hasAd: false,
};

export default withThemes('sidebar', {
  default: styles,
  inFeed: inFeedStyles,
})(withStyles(styles, inFeedStyles)(Sidebar));
