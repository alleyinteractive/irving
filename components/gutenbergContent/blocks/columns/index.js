import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import styles from './columns.css';

const Columns = (props) => {
  const { children, className, gbClassName } = props;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={classNames('wp-block-columns', gbClassName)}>
        {children}
      </div>
    </div>
  );
};

Columns.propTypes = {
  className: PropTypes.string,
  gbClassName: PropTypes.string,
  children: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
};

Columns.defaultProps = {
  className: '',
  gbClassName: '',
};

export default withStyles(styles)(Columns);
