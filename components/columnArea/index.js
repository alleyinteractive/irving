import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import withThemes from 'components/hoc/withThemes';
import styles from './columnArea.css';
import oneColumnStyles from './oneColumn.css';
import twoColumnStyles from './twoColumn.css';

const ColumnArea = ({ children, theme }) => {
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
};

ColumnArea.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withThemes('column-area', {
  default: styles,
  'one-column': oneColumnStyles,
  'two-column': twoColumnStyles,
})(withStyles(styles, oneColumnStyles, twoColumnStyles)(ColumnArea));
