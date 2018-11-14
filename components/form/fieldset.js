import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './fieldset.css';

const FormFieldset = (props) => {
  const { heading, children } = props;
  return (
    <fieldset className={styles.section}>
      {heading && <h3 className={styles.heading}>{heading}</h3>}
      {children}
    </fieldset>
  );
};

FormFieldset.propTypes = {
  heading: PropTypes.string,
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

FormFieldset.defaultProps = {
  heading: '',
};

export default withStyles(styles)(FormFieldset);
