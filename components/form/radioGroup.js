import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './radioGroup.css';
import InputRadio from './inputRadio';

const RadioGroup = (props) => {
  const {
    name,
    onChange,
    inputs,
    currentValue,
  } = props;
  return (
    <div className={styles.group}>
      {inputs.map(({ value, label }, idx) => (
        <div key={value} className={styles.item}>
          <InputRadio
            value={value}
            label={label}
            name={name}
            id={name + idx}
            checked={value === currentValue}
            onChange={onChange(name)}
          />
        </div>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withStyles(styles)(RadioGroup);
