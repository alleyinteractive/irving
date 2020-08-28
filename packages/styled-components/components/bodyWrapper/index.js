import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import Loader from 'components/loader';
import getStandardProps from '@irvingjs/styled/utils/getStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

const BodyWrapper = (props) => {
  const {
    bodyClasses,
    children,
    theme,
  } = props;
  const standardProps = getStandardProps(props, {
    id: 'content',
  });
  const { Main } = theme;

  return (
    <Loader>
      <Helmet>
        <body className={classNames(bodyClasses)} />
      </Helmet>
      <Main
        {...standardProps}
        role="main"
      >
        {children}
      </Main>
    </Loader>
  );
};

BodyWrapper.propTypes = {
  ...standardPropTypes,
  /**
   * Additional classes to apply to the <body> tag using react-helmet.
   */
  bodyClasses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

BodyWrapper.defaultProps = {
  ...standardDefaultProps,
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
