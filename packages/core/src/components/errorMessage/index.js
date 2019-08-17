import React from 'react';
import Heading from 'components/helpers/heading';
import { withStyles } from 'critical-style-loader/lib';

import styles from './errorMessage.css';

const ErrorMessage = () => (
  <div className={styles.wrapper}>
    <Heading
      tag="h1"
      typeStyle="step-up-four"
    >
      Something has gone wrong.
    </Heading>
    <p>You can try refreshing the page. The problem may be temporary.</p>
    <p>We have been notified of the problem, and are working to resolve it.</p>
  </div>
);

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(ErrorMessage);
