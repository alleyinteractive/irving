import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';
import classNames from 'classnames';
import { UIDReset, UIDConsumer } from 'react-uid';

// Themes
import styles from './columnArea.css';
import oneColumnStyles from './oneColumn.css';
import twoColumnStyles from './twoColumn.css';

const ColumnArea = ({ children, theme, themeName }) => {
  // @todo leave this block for deprecation purposes (topics page, etc.)
  // It may make sense to refactor this component into multiple components.
  if ('two-column' === themeName) {
    // Separate content and sidebar
    const content = children.filter(
      (child) => 'sidebar' !== child.props.componentName
    );
    const sidebar = findChildByName('sidebar', children);

    return (
      <div className={classNames(theme.wrapper, {})}>
        {content && <div className={theme.main}>{content}</div>}
        {sidebar && <aside className={theme.sidebar}>{sidebar}</aside>}
      </div>
    );
  }

  return (
    <div className={theme.wrapper}>
      {children.map((child) => (
        <UIDReset>
          <UIDConsumer>
            {(id, uid) => (
              <div className={theme.column} key={uid('column')}>
                {child}
              </div>
            )}
          </UIDConsumer>
        </UIDReset>
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
  'one-column': oneColumnStyles,
  'two-column': twoColumnStyles,
})(withStyles(styles, oneColumnStyles, twoColumnStyles)(ColumnArea));
