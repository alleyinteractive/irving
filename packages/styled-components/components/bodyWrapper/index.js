import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import withLoader from '@irvingjs/core/components/hoc/withLoader';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';

const BodyWrapper = (props) => {
  const {
    bodyClasses,
    className,
    children,
    style,
    theme,
  } = props;

  const { Main } = theme;

  return (
    <>
      <Helmet>
        <body className={classNames(bodyClasses)} style={style} />
      </Helmet>
      <Main role="main" className={className}>
        {children}
      </Main>
    </>
  );
};

BodyWrapper.defaultProps = {
  bodyClasses: [],
  className: '',
  style: {},
  theme: defaultStyles,
};

BodyWrapper.propTypes = {
  /**
   * Children of the body component.
   */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  /**
   * Additional classes to apply to the `<body>` tag using react-helmet.
   */
  bodyClasses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  /**
   * CSS classname, applied to the `<main>` element, which wraps children of this component.
   */
  className: PropTypes.string,
  /**
   * Inline CSS styles.
   */
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

const themeMap = {
  default: defaultStyles,
};

export { BodyWrapper as PureComponent };

export const StyledComponent = withThemes(themeMap)(withLoader(BodyWrapper));

export default StyledComponent;
