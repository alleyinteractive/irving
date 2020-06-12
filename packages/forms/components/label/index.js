import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
      {required && <span className={styles.required}>* required</span>}
    </label>
  );
};
/* eslint-enable */

Label.propTypes = {
  /**
   * Additional className(s) for the label.
   */
  className: PropTypes.string,
  /**
   * Contents of the label.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ])
    ),
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  /**
   * Contents of `for` attribute, should correspond to an input's `id` attribute.
   */
  htmlFor: PropTypes.string.isRequired,
  /**
   * Display `required` text and styles.
   */
  required: PropTypes.bool,
};

Label.defaultProps = {
  className: '',
  required: false,
};

export default Label;
