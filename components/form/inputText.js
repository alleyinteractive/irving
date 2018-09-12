import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import Label from './label';
import styles from './text.css';

const InputText = (props) => {
  const {
    name,
    label,
    required,
    error,
    className,
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
        text={label}
        required={required}
        className={styles.label}
      />
      <input {...props} className={styles.input} type="text" />
      {!! error &&
        <span className={styles.errorText}>{error}</span>
      }
    </div>
  );
};

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
