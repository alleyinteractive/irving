import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';
import omit from 'lodash/fp/omit';
import Label from './label';
import styles from './text.css';

const TextArea = (props) => {
  const {
    name,
    required,
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
        required={required}
        className={styles.label}
      >
        {children}
      </Label>
      <textarea
        {...omit(['children'], props)}
        className={styles.textarea}
        type="text"
      />
      {!! error &&
        <span className={styles.errorText}><RawHTML content={error} /></span>
      }
    </div>
  );
};

TextArea.propTypes = {
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
   * How many rows of text should this textarea contain?
   */
  rows: PropTypes.number,
  /**
   * Validation or error message to display to the user.
   */
  error: PropTypes.string,
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

TextArea.defaultProps = {
  placeholder: '',
  value: '',
  required: false,
  className: '',
  rows: 10,
  error: '',
};

export default withStyles(styles)(TextArea);
