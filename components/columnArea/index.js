import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';

// Themes
import feedColumnTheme from './columnArea--feed.css';
import fullStoryTheme from './columnArea--full.css';
import magazineTheme from './columnArea--magazine.css';
import oneColumnTheme from './columnArea--oneCol.css';
import pageTheme from './columnArea--page.css';

const ColumnArea = ({ children, theme }) => {
  // @todo leave this block for deprecation purposes (topics page, etc.)
  // It may make sense to refactor this component into multiple components.
  // if ('feed' === themeName) {
  // Separate content and sidebar
  const content = children.filter(
    (child) => 'sidebar' !== child.props.componentName
  );
  const sidebar = findChildByName('sidebar', children);

  return (
    <div className={theme.wrapper}>
      {content && (
        <div
          className={theme.main}
        >
          {content}
        </div>
      )}
      {sidebar && (
        <div
          className={theme.sidebar}
        >
          {sidebar}
        </div>
      )}
    </div>
  );
  // }

  // return (
  //   <div className={theme.wrapper}>
  //     {children.map((child) => (
  //       <div className={theme.column} key={child.props.componentName}>
  //         {child}
  //       </div>
  //     ))}
  //   </div>
  // );
};

ColumnArea.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.object.isRequired,
  // themeName: PropTypes.string.isRequired,
};

export default withThemes('column-area', {
  default: feedColumnTheme,
  feed: feedColumnTheme,
  story: fullStoryTheme,
  single: oneColumnTheme,
  page: pageTheme,
  magazine: magazineTheme,
})(
  withStyles(
    feedColumnTheme,
    fullStoryTheme,
    magazineTheme,
    oneColumnTheme,
    pageTheme,
  )(ColumnArea)
);
