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
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
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
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  required: PropTypes.bool,
};

RadioOrCheckboxGroup.defaultProps = {
  required: false,
};

export default withStyles(styles)(RadioOrCheckboxGroup);
