import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import Label from './label';
import styles from './text.css';

const TextArea = ({
  name,
  placeholder,
  label,
  value,
  onChange,
  required,
  className,
  rows,
  error,
}) => (
  <div className={classNames(
    styles.inputWrapper,
    className,
    { [styles.error]: !!error }
  )}
  >
    <Label
      htmlFor={name}
      text={label}
      required={required}
      className={styles.label}
    />
    <textarea
      className={styles.textarea}
      type="text"
      placeholder={placeholder}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
    {!!error &&
      <span className={styles.errorText}>{error}</span>
    }
  </div>
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  rows: PropTypes.number,
  error: PropTypes.string,
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
