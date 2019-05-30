import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import SpinnerSVG from 'assets/icons/spinner.svg';
import styles from './spinner.css';

// Using inline styles for centering to prevent jumpiness when component is loaded.
const inlineStyle = {
  display: 'block',
  margin: '0 auto',
};

const Spinner = () => (
  <SpinnerSVG
    style={inlineStyle}
    className={classNames(styles.spinner, 'spinner')}
  />
);

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Spinner);
