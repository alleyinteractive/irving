import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';

import styles from './gutenbergContent.css';
import infeedTheme from './gutenbergContent--infeed.css';

const GutenbergContent = ({ children, className, theme }) => {
  const html = findChildByName('html', children);
  const contentToInsert = children.filter(
    ({ props: { componentName } }) => 'html' !== componentName
  );

  return (
    <div className={classNames(theme.wrapper, className)}>
      {html &&
        React.cloneElement(html, {
          className: theme.content,
          oembed: true,
          prependChildren: contentToInsert,
        })}
    </div>
  );
};

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
