import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import Loader from 'components/loader';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

const BodyWrapper = (props) => {
  const {
    bodyClasses,
    children,
    theme,
  } = props;
  const standardProps = useStandardProps(props);
  const { Main } = theme;

  return (
    <Loader>
      <Helmet>
        <body className={classNames(bodyClasses)} />
      </Helmet>
      <Main
        {...standardProps}
        id="content"
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
  ...getStandardDefaultProps(),
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
