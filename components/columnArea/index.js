import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';
import classNames from 'classnames';

// Themes
import styles from './columnArea.css';
import oneColumnTheme from './oneColumn.css';
import skinnyColumnTheme from './skinnyColumn.css';

const ColumnArea = ({ children, theme, themeName }) => {
  // @todo leave this block for deprecation purposes (topics page, etc.)
  // It may make sense to refactor this component into multiple components.
  if ('skinny-column' === themeName) {
    // Separate content and sidebar
    const content = children.filter(
      (child) => 'sidebar' !== child.props.componentName
    );
    const sidebar = findChildByName('sidebar', children);

    return (
      <div className={classNames(theme.wrapper)}>
        {content && (
          <div
            className={classNames(theme.main)}
          >
            {content}
          </div>
        )}
        {sidebar && (
          <div
            className={classNames(theme.sidebar)}
          >
            {sidebar}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={theme.wrapper}>
      {children.map((child) => (
        <div className={theme.column} key={child.props.componentName}>
          {child}
        </div>
      ))}
    </div>
  );
};

ColumnArea.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default withThemes('column-area', {
  default: styles,
  oneColumn: oneColumnTheme,
  'skinny-column': skinnyColumnTheme,
})(withStyles(styles, oneColumnTheme, skinnyColumnTheme)(ColumnArea));
