import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import withLoader from '@irvingjs/core/components/hoc/withLoader';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';

const BodyWrapper = (props) => {
  const { bodyClasses, children, theme } = props;
  const { Main } = theme;

  return (
    <>
      <Helmet>
        <body className={classNames(bodyClasses)} />
      </Helmet>
      <Main role="main" id="content">
        {children}
      </Main>
    </>
  );
};

BodyWrapper.propTypes = {
  /**
   * Children of the body component.
   */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  /**
   * Additional classes to apply to the <body> tag using react-helmet.
   */
  bodyClasses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

BodyWrapper.defaultProps = {
  bodyClasses: [],
  theme: defaultStyles,
};

const themeMap = {
  default: defaultStyles,
};

export { BodyWrapper as PureComponent };

export const StyledComponent = withThemes(themeMap)(withLoader(BodyWrapper));

export default StyledComponent;
