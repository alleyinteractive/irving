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
    // eslint-disable-next-line max-len
    (child) => 'sidebar' !== child.props.componentName && 'subtopics-section' !== child.props.componentName
  );
  const sidebar = findChildByName('sidebar', children);
  const subtopics = findChildByName('subtopics-section', children);

  return (
    <div className={classNames(theme.wrapper, {})}>
      {content && <div className={theme.main}>{content}</div>}
      {sidebar && <aside className={theme.sidebar}>{sidebar}</aside>}
      {subtopics && <div className={theme.container}>{ subtopics }</div>}
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
