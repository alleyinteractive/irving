import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';
import omit from 'lodash/fp/omit';
import Label from './label';
import styles from './text.css';

const InputText = (props) => {
  const {
    isFocused,
    name,
    required,
    error,
    className,
    children,
    type,
  } = props;

  const inputRef = useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

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
      <input
        {...omit(['children', 'isFocused'], props)}
        ref={inputRef}
        className={styles.input}
        type={type}
      />
      {!! error &&
        <span className={styles.errorText}><RawHTML content={error} /></span>
      }
    </div>
  );
};

InputText.defaultProps = {
  isFocused: false,
};

InputText.propTypes = {
  /**
   * Prop for setting focus on the input
   */
  isFocused: PropTypes.bool,
  /**
   * Contents of the `name` attribute for this input.
   */
  name: PropTypes.string.isRequired,
  /**
   * Placeholder content for this input.
   */
  placeholder: PropTypes.string,
  /**
   * Event handler triggered when the input value changes.
   * Usually supplied with an `onChangeInput` function from `withFormHandler`.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Value of the input supplied from component state. Usually handled by `withFormHandler`.
   */
  value: PropTypes.string,
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
  /**
   * Additional options for HTML5 input types.
   */
  type: PropTypes.oneOf(['text', 'email', 'search', 'password', 'url', 'date']),
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
};

InputText.defaultProps = {
  placeholder: '',
  value: '',
  required: false,
  className: '',
  error: '',
  type: 'text',
};

export default withStyles(styles)(InputText);
