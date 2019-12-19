import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';

import styles from './gutenbergContent.css';
import infeedTheme from './gutenbergContent--infeed.css';

const GutenbergContent = ({ children, className, theme }) => (
  <div className={classNames(theme.wrapper, className)}>
    {children.map((child) => React.cloneElement(child, {
      oembed: true,
    }))}
  </div>
);

GutenbergContent.defaultProps = {
  className: '',
};

GutenbergContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default withThemes('gutenberg-content', {
  default: styles,
  infeed: infeedTheme,
})(withStyles(styles, infeedTheme)(GutenbergContent));
