import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './section.css';

const FormSection = (props) => {
  const { heading, children } = props;
  return (
    <section className={styles.section}>
      {heading && <h3 className={styles.heading}>{heading}</h3>}
      {children}
    </section>
  );
};

FormSection.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node.isRequired,
};

FormSection.defaultProps = {
  heading: '',
};

export default withStyles(styles)(FormSection);
