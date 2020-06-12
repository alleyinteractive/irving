import React from 'react';
import PropTypes from 'prop-types';
import styles from './fieldset.css';

const Fieldset = (props) => {
  const { heading, children } = props;
  return (
    <fieldset className={styles.section}>
      {heading && <h3 className={styles.heading}>{heading}</h3>}
      {children}
    </fieldset>
  );
};

Fieldset.propTypes = {
  /**
   * Heading/title for this fieldset.
   */
  heading: PropTypes.string,
  /**
   * Contents of the fieldset
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
};

Fieldset.defaultProps = {
  heading: '',
};

export default Fieldset;
