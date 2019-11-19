import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpinnerSVG from 'assets/icons/spinner.svg';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import styles from './spinner.css';

// Using inline styles for centering to prevent jumpiness when component is loaded.
const inlineStyle = {
  display: 'block',
  margin: '0 auto',
};

const Spinner = (props) => {
  const { theme } = props;

  return (
    <SpinnerSVG
      style={inlineStyle}
      className={classNames(theme.spinner, 'spinner')}
    />
  );
};

Spinner.propTypes = {
  theme: PropTypes.object.isRequired,
};

const wrapWithStyles = withStyles(styles);
const wrapWithThemes = withThemes('Spinner', { default: styles });
export const themeSpinner = createWithUserThemes(Spinner, styles);

export default wrapWithThemes(wrapWithStyles(Spinner));
