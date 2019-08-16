import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';
import styles from './state.css';

const State = ({
  submitting,
  submitted,
  failed,
  children,
  errorText,
  successText,
}) => {
  let responseContent;

  if (failed) {
    responseContent = (
      <div className={styles.error}>
        <span className={styles.errorText}>
          <RawHTML content={errorText} />
        </span>
      </div>
    );
  }

  if (submitted) {
    responseContent = (
      <div className={styles.success}>
        <span className={styles.successText}>{successText}</span>
      </div>
    );
  }

  if (submitting) {
    responseContent = (
      <div className={styles.submitting}>
        Submitting...
      </div>
    );
  }

  return (
    <fieldset
      className={styles.wrapper}
      disabled={submitting || submitted || failed}
    >
      {responseContent &&
        <div className={styles.response}>{responseContent}</div>
      }
      {children && <div className={styles.content}>{children}</div>}
    </fieldset>
  );
};

State.propTypes = {
  /**
   * Is this form in the process of being submitted (communicating with an API)?
   */
  submitting: PropTypes.bool.isRequired,
  /**
   * Has the form successfully submitted?
   */
  submitted: PropTypes.bool.isRequired,
  /**
   * Has the form submission failed?
   */
  failed: PropTypes.bool.isRequired,
  /**
   * Form contents.
   */
  children: PropTypes.node,
  /**
   * Custom text to display if an error occurrs (`failed`).
   */
  errorText: PropTypes.string,
  /**
   * Custom text to display if submission succeeds (`submitted`).
   */
  successText: PropTypes.string,
};

State.defaultProps = {
  children: null,
  errorText: 'An error ocurred with your submission, please try again later.',
  successText: 'Success! Thank you for your submission.',
};

export default withStyles(styles)(State);
