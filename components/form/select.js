import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import Label from './label';
import styles from './select.css';

const Select = ({
  name,
  label,
  options,
  value,
  required,
  onChange,
  className,
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
      require={required}
      className={styles.label}
    />
    <select
      value={value}
      className={styles.select}
      name={name}
      id={name}
      onChange={onChange}
    >
      {!value && <option value />}
      {options.map(({ text, value: optionValue }) => (
        <option
          key={optionValue}
          value={optionValue}
        >{text || optionValue}</option>
      ))}
    </select>
    {!!error &&
      <span className={styles.errorText}>{error}</span>
    }
  </div>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

Select.defaultProps = {
  value: '',
  defaultValue: '',
  required: false,
  className: '',
  error: '',
};

export default withStyles(styles)(Select);
