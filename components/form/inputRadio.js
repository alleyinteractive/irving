import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import Label from './label';
import styles from './radio.css';

const InputRadio = ({
  name,
  value,
  id,
  label,
  checked,
  required,
  onChange,
  className,
}) => (
  <div className={classNames(styles.inputWrapper, className)}>
    <input
      type="radio"
      id={id}
      value={value}
      name={name}
      checked={checked}
      required={required}
      className={styles.input}
      onChange={onChange}
    />
    <Label htmlFor={id} text={label} require={required} />
  </div>
);

InputRadio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

InputRadio.defaultProps = {
  checked: false,
  required: false,
  className: '',
};

export default withStyles(styles)(InputRadio);
