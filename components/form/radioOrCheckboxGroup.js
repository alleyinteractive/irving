import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Label from './label';
import styles from './radioOrCheckboxGroup.css';

const RadioOrCheckboxGroup = (props) => {
  const {
    name,
    onChange,
    inputs,
    currentValue,
    type,
    required,
  } = props;

  return (
    <div className={styles.group}>
      {inputs.map((input, idx) => {
        const { value, label } = input;
        const id = name + idx;

        return (
          <div key={value} className={styles.item}>
            <Label
              htmlFor={id}
              required={required}
              className={styles.label}
            >
              <input
                value={value}
                name={name}
                id={id}
                checked={(
                  value === currentValue ||
                  currentValue.includes(value)
                )}
                onChange={onChange(name)}
                type={type}
                className={styles.input}
              />
              <div className={styles.labelTextWrapper}>{label}</div>
            </Label>
          </div>
        );
      })}
    </div>
  );
};

RadioOrCheckboxGroup.propTypes = {
  /**
   * Contents of the `name` attribute for this input.
   */
  name: PropTypes.string.isRequired,
  /**
   * Event handler triggered when the input value changes.
   * Usually supplied with an `onChangeInput` function from `withFormHandler`.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Currently selected checkbox or radio button. This prop is mapped to the `checked` attributed.
   */
  currentValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  /**
   * Array of radio or checkbox inputs to include in this group.
   */
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Label for this input.
       */
      label: PropTypes.oneOfType([
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
       * Value of this input. Should be static, unlike other input types.
       */
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /**
   * Type of input to use. Can be either `checkbox` or `radio`.
   */
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  /**
   * Is this input required?
   */
  required: PropTypes.bool,
};

RadioOrCheckboxGroup.defaultProps = {
  required: false,
};

export default withStyles(styles)(RadioOrCheckboxGroup);
