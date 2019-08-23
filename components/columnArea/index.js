import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import withThemes from 'components/hoc/withThemes';
import styles from './columnArea.css';
import oneColumnStyles from './oneColumn.css';
import twoColumnStyles from './twoColumn.css';

const ColumnArea = (props) => {
  const { children, theme } = props;

  // Separate content and sidebar
  const content = children.filter(
    (child) => 'sidebar' !== child.props.componentName
  );
  const sidebar = findChildByName('sidebar', children);

  return (
    <div className={classNames(theme.wrapper, {})}>
      {sidebar && <aside className={theme.sidebar}>{sidebar}</aside>}
      {/* Render everything else down here */}
      {content && <div className={theme.main}>{content}</div>}
    </div>
  );
};

ColumnArea.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.object.isRequired,
};

const wrapWithStyles = withStyles(styles, oneColumnStyles, twoColumnStyles);

const wrapWithThemes = withThemes('column-area', {
  default: styles,
  oneColumn: oneColumnStyles,
  twoColumn: twoColumnStyles,
});

export default wrapWithStyles(wrapWithThemes(ColumnArea));
