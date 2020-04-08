import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';

// Themes
import feedColumnTheme from './columnArea--feed.css';
import fullStoryTheme from './columnArea--fullStory.css';
import magazineTheme from './columnArea--magazine.css';
import oneColumnTheme from './columnArea--oneCol.css';
import pageTheme from './columnArea--page.css';
import centeredTheme from './columnArea--centered.css';
import tr50Theme from './columnArea--tr50.css';
import hubTheme from './columnArea--hub.css';

const ColumnArea = ({ children, theme }) => {
  // Separate content and sidebar
  const childIsSidebar = ({ componentName, isSidebar = false }) => (
    isSidebar || 'sidebar' === componentName
  );
  const content = children.filter(({ props }) => ! childIsSidebar(props));
  const sidebar = children.filter(({ props }) => childIsSidebar(props));

  return (
    <div className={theme.wrapper}>
      {!! content.length && (
        <div
          className={theme.main}
        >
          {content}
        </div>
      )}
      {!! sidebar.length && (
        <div
          className={theme.sidebar}
        >
          {sidebar}
        </div>
      )}
    </div>
  );
};

ColumnArea.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.object.isRequired,
};

export default withThemes('column-area', {
  default: feedColumnTheme,
  feed: feedColumnTheme,
  fullStory: fullStoryTheme,
  single: oneColumnTheme,
  page: pageTheme,
  magazine: magazineTheme,
  centered: centeredTheme,
  tr50: tr50Theme,
  hub: hubTheme,
})(
  withStyles(
    feedColumnTheme,
    fullStoryTheme,
    magazineTheme,
    oneColumnTheme,
    pageTheme,
    centeredTheme,
    tr50Theme,
    hubTheme
  )(ColumnArea)
);
