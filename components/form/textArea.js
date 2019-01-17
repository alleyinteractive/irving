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
    label,
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
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  rows: PropTypes.number,
  error: PropTypes.string,
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
