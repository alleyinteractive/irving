import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';
import omit from 'lodash/fp/omit';
import Label from './label';
import styles from './text.css';

const InputText = (props) => {
  const {
    name,
    required,
    error,
    className,
    children,
    type,
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
      <input
        {...omit(['children'], props)}
        className={styles.input}
        type={type}
      />
      {!! error &&
        <span className={styles.errorText}><RawHTML content={error} /></span>
      }
    </div>
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'search', 'password', 'url']),
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ])
  ).isRequired,
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
