import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './state.css';

const FormState = ({
  submitting,
  submitted,
  failed,
  children,
  successText,
}) => {
  if (failed) {
    return (
      <div className={classNames(styles.response, styles.failure)}>
        <span className={styles.error}>
          An error ocurred with your submission.
        </span>
        Please try again later.
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={classNames(styles.response, styles.success)}>
        {successText}
      </div>
    );
  }

  if (submitting) {
    return (
      <div className={classNames(styles.response, styles.submitting)}>
        Submitting...
      </div>
    );
  }

  return children;
};

FormState.propTypes = {
  submitting: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  successText: PropTypes.string,
};

FormState.defaultProps = {
  successText: 'Success! Thank you for your submission.',
};

export default withStyles(styles)(FormState);
