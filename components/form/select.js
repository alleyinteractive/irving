import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';
import Label from './label';
import styles from './select.css';

const Select = (props) => {
  const {
    name,
    options,
    value,
    required,
    onChange,
    className,
    error,
    children,
  } = props;

  return (
    <div className={classNames(
      styles.inputWrapper,
      className,
      { [styles.error]: !! error }
    )}
    >
      <Label
        htmlFor={name}
        require={required}
        className={styles.label}
      >
        {children}
      </Label>
      <select
        value={value}
        className={styles.select}
        name={name}
        id={name}
        onChange={onChange}
      >
        {! value && <option value />}
        {options.map(({ text, value: optionValue }) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {text || optionValue}
          </option>
        ))}
      </select>
      {!! error &&
        <span className={styles.errorText}><RawHTML content={error} /></span>
      }
    </div>
  );
};

Select.propTypes = {
  /**
   * Contents of the `name` attribute for this input.
   */
  name: PropTypes.string.isRequired,
  /**
   * Contents of the form label.
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
   * Array of options for this select. Each will be output to an `<option>` element.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Display text for this `<option>`.
       */
      text: PropTypes.string,
      /**
       * Value to set in form state.
       */
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Value of the input supplied from component state. Usually handled by `withFormHandler`.
   */
  value: PropTypes.string,
  /**
   * Event handler triggered when the input value changes.
   * Usually supplied with an `onChangeInput` function from `withFormHandler`.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Is this field required?
   */
  required: PropTypes.bool,
  /**
   * Additional className(s) to include on the wrapper element for this input.
   */
  className: PropTypes.string,
  /**
   * Validation or error message to display to the user.
   */
  error: PropTypes.string,
};

Select.defaultProps = {
  value: '',
  required: false,
  className: '',
  error: '',
};

export default withStyles(styles)(Select);
