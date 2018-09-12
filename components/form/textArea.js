import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import Label from './label';
import styles from './text.css';

const TextArea = (props) => {
  const {
    name,
    label,
    required,
    className,
    error,
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
      <textarea {...props} className={styles.textarea} type="text" />
      {!! error &&
        <span className={styles.errorText}>{error}</span>
      }
    </div>
  );
};

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
