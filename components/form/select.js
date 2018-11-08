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
    label,
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
  name: PropTypes.string.isRequired,
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
  required: false,
  className: '',
  error: '',
};

export default withStyles(styles)(Select);
