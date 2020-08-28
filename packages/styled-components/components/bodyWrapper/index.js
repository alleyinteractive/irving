import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import Loader from 'components/loader';
import * as defaultStyles from './themes/default';

const BodyWrapper = (props) => {
  const { bodyClasses, children, theme } = props;
  const { Main } = theme;

  return (
    <Loader>
      <Helmet>
        <body className={classNames(bodyClasses)} />
      </Helmet>
      <Main role="main" id="content">
        {children}
      </Main>
    </Loader>
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

export {
  BodyWrapper as Component,
  themeMap,
};

export default BodyWrapper;
