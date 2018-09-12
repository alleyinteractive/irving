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
    text,
    required,
    className,
  } = props;
  return (
    <label
      className={classNames(styles.label, className)}
      htmlFor={htmlFor}
    >
      {text}
      {required && <span className={styles.required}>required</span>}
    </label>
  );
};
/* eslint-enable */

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Label.defaultProps = {
  className: '',
  required: false,
};

export default withStyles(styles)(Label);
