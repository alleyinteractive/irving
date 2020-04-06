import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './sidebar.css';

const Sidebar = (props) => {
  const {
    children,
    className,
    context,
    hasAd,
    isSticky,
    pinBottomItem,
  } = props;

  return (
    <aside
      className={classNames(className, styles.wrapper, {
        [styles.hasAd]: hasAd,
      })}
      style={{
        position: isSticky ? 'sticky' : 'relative',
        top: isSticky ? 100 : 0,
        height: pinBottomItem ? '100%' : 'inherit',
      }}
    >
      <ul className={pinBottomItem ? styles.pinnedBottom : ''}>
        {children.map((child, index) => {
          const {
            props: { gtmTargetingClass },
          } = child;
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`${child['component-name']}_${index}`}
              className={styles.widgetWrapper}
            >
              {! gtmTargetingClass ?
                cloneElement(child, { gtmTargetingClass: context }) :
                child
              }
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  context: PropTypes.string,
  hasAd: PropTypes.bool,
  isSticky: PropTypes.bool,
  pinBottomItem: PropTypes.bool.isRequired,
};

Sidebar.defaultProps = {
  className: '',
  context: '',
  isSticky: true,
  hasAd: false,
};

export default (withStyles(styles)(Sidebar));
