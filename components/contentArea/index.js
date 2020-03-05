import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';

import styles from './contentArea.css';
import simpleTheme from './simpleContentArea.css';
import contentWrap from './contentArea--contentWrap.css';

const ContentArea = ({ children, theme }) => (
  <div className={classNames(theme.wrapper, theme.gradient)}>
    {children}
  </div>
);

ContentArea.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withThemes('content-area', {
  default: styles,
  simple: simpleTheme,
  contentWrap,
})(withStyles(styles, simpleTheme, contentWrap)(ContentArea));
