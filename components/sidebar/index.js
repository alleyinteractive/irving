import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import styles from './sidebar.css';

const Sidebar = (props) => {
  const {
    children, className, context, hasAd, themeName,
  } = props;

  return (
    <aside
      className={classNames(className, styles.wrapper, styles[themeName], {
        [styles.hasAd]: hasAd,
      })}
    >
      {children.map((child) => {
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
      })}
    </aside>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  context: PropTypes.string,
  hasAd: PropTypes.bool,
  themeName: PropTypes.string,
};

Sidebar.defaultProps = {
  className: '',
  context: '',
  themeName: '',
  hasAd: false,
};

export default withStyles(styles)(Sidebar);
