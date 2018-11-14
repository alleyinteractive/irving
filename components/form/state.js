import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';
import styles from './state.css';

const FormState = ({
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
      <div className={styles.failure}>
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

FormState.propTypes = {
  submitting: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  children: PropTypes.node,
  errorText: PropTypes.string,
  successText: PropTypes.string,
};

FormState.defaultProps = {
  children: null,
  errorText: 'An error ocurred with your submission, please try again later.',
  successText: 'Success! Thank you for your submission.',
};

export default withStyles(styles)(FormState);
