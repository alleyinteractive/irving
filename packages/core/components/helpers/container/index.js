import React from 'react';
import PropTypes from 'prop-types';
import breakpoints from 'config/css/breakpoints';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import styles from './container.css';

const Container = (props) => {
  const {
    size,
    children,
    className,
  } = props;

  return (
    <div
      className={classNames(
        styles[size],
        className,
      )}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  /**
   * Container children.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classnames to apply to this container.
   */
  className: PropTypes.string,
  /**
   * Width of the container.
   */
  size: PropTypes.oneOf(
    Object.keys(breakpoints.bkptVal)
  ),
};

Container.defaultProps = {
  size: 'xxl',
  className: '',
};

export default withStyles(styles)(Container);
