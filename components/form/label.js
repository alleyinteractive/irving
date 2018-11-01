import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import styles from './label.css';

// This rule is both deprecated and appears to be causing an erroneous warning
/* eslint-disable jsx-a11y/label-has-for */
const Label = (props) => {
  const {
    htmlFor,
    required,
    className,
    children,
  } = props;
  return (
    <label
      className={classNames(styles.label, className)}
      htmlFor={htmlFor}
    >
      {children}
      {required && <span className={styles.required}>required</span>}
    </label>
  );
};
/* eslint-enable */

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ])
  ).isRequired,
  htmlFor: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Label.defaultProps = {
  className: '',
  required: false,
};

export default withStyles(styles)(Label);
