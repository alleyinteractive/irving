import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import classNames from 'classnames';

import styles from './contentArea.css';
import simpleTheme from './simpleContentArea.css';

const ContentArea = ({ children, theme }) => (
  <div className={classNames(theme.wrapper, styles.wrapper)}>
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
})(withStyles(styles, simpleTheme)(ContentArea));
