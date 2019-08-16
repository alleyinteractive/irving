import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import omit from 'lodash/fp/omit';
import Label from './label';
import styles from './input.css';

const Input = (props) => {
  const {
    name,
    required,
    className,
    children,
    options,
    ownValue,
    propsCreator,
    InputComponent,
    validation,
  } = props;
  const inputProps = {
    ...propsCreator(name, ownValue),
    ...omit(
      [
        'children',
        'propsCreator',
        'InputComponent',
        'ownValue',
        'options',
      ],
      props
    ),
  };

  return (
    <div
      className={classNames(
        styles.inputWrapper,
        className,
        {
          [styles[InputComponent]]: 'string' === typeof InputComponent,
          [styles.error]: validation,
          [styles[inputProps.type]]: inputProps.type,
        }
      )}
    >
      <Label
        htmlFor={name}
        required={required}
        className={styles.label}
      >
        {children}
      </Label>
      {('select' === InputComponent && !! options.length) ? (
        <InputComponent
          {...inputProps}
          id={name}
          className={styles.inputElement}
        >
          {options.map((option) => {
            const { value, label } = option;

            return (
              <option
                key={`${value}${label}`}
                value={value}
              >
                {label}
              </option>
            );
          })}
        </InputComponent>
      ) : (
        <InputComponent
          {...inputProps}
          id={name}
          className={styles.inputElement}
        />
      )}
      {validation && (
        <span className={styles.validationMessge}>{validation}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  /**
   * Component or element to use for rendering this input.
   */
  InputComponent: PropTypes.string,
  /**
   * Contents of the `name` attribute for this input.
   */
  name: PropTypes.string.isRequired,
  /**
   * Value of input, used for radio and checkbox types.
   */
  ownValue: PropTypes.string,
  /**
   * Placeholder content for this input.
   */
  placeholder: PropTypes.string,
  /**
   * Is this field required?
   */
  required: PropTypes.bool,
  /**
   * Additional className(s) to include on the wrapper element for this input.
   */
  className: PropTypes.string,
  /**
   * Function returning JSX for select options.
   */
  options: PropTypes.array,
  /**
   * Props creator function from react-use-form-state.
   */
  propsCreator: PropTypes.func.isRequired,
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
  /**
   * Validation message.
   */
  validation: PropTypes.string,
};

Input.defaultProps = {
  InputComponent: 'input',
  ownValue: '',
  options: [],
  placeholder: '',
  required: false,
  className: '',
  validation: '',
};

export default withStyles(styles)(Input);
