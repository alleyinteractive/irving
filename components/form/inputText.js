import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import Label from './label';
import styles from './text.css';

const InputText = ({
  name,
  placeholder,
  label,
  value,
  onChange,
  required,
  className,
  error,
}) => (
  <div className={classNames(
    styles.inputWrapper,
    className,
    { [styles.error]: !! error }
  )}
  >
    <Label
      htmlFor={name}
      text={label}
      required={required}
      className={styles.label}
    />
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
    {!! error &&
      <span className={styles.errorText}>{error}</span>
    }
  </div>
);

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

InputText.defaultProps = {
  placeholder: '',
  value: '',
  required: false,
  className: '',
  error: '',
};

export default withStyles(styles)(InputText);
