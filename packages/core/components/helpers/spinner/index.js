import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpinnerSVG from 'assets/icons/spinner.svg';

import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import styles from './spinner.css';

const Spinner = (props) => {
  const {
    color,
    size,
    theme,
  } = props;

  // Using inline styles for centering prevents jumpiness as the component is
  // loaded, and allows passing color and size props to  inline styles.
  // `stroke="currentColor"` on the SVG `<g>` or `<path>` element allows the
  // `color` CSS property from the parent `<svg>` to cascade.
  const inlineStyle = {
    color,
    display: 'block',
    height: size,
    margin: '0 auto',
    width: size,
  };

  return (
    <SpinnerSVG
      style={inlineStyle}
      className={classNames(theme.spinner, 'spinner')}
    />
  );
};

Spinner.defaultProps = {
  color: '#777',
  size: '75px',
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  theme: PropTypes.object.isRequired,
};


const wrapWithThemes = withThemes('Spinner', { default: styles });
export const themeSpinner = createWithUserThemes(Spinner, styles);

export default wrapWithThemes(Spinner);
