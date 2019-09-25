import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import classNames from 'classnames';
import { UIDReset, UIDConsumer } from 'react-uid';
import kebabCase from 'lodash.kebabcase';

// Styles
import styles from './postList.css';
import withTitleTheme from './postList--withTitle.css';

const PostList = ({
  children, title, showTitle, theme, themeName,
}) => (
  <UIDReset>
    <UIDConsumer>
      {(id, uid) => {
        const titleID = '' !== title ? kebabCase(title) : uid('post-list');
        const useScreenReaderTitle = ! showTitle && 'withTitle' !== themeName;
        return (
          <div className={theme.wrapper}>
            {'' !== title && (
              <h2
                className={classNames(theme.title, {
                  'screen-reader-text': useScreenReaderTitle,
                })}
                id={titleID}
              >
                {title}
              </h2>
            )}
            <ul
              className={theme.wrapper}
              aria-labelledby={'' !== title && titleID}
            >
              {children.map((child, index) => (
                <li key={uid(`postListItem${index}`)}>
                  {React.cloneElement(child, {
                    itemPosition: (() => {
                      if (0 === index) {
                        return 'first';
                      }

                      if (index === children.length - 1) {
                        return 'last';
                      }

                      return 'middle';
                    })(),
                  })}
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </UIDConsumer>
  </UIDReset>
);

PostList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  showTitle: PropTypes.bool,
  title: PropTypes.string,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  themeName: PropTypes.string,
};

PostList.defaultProps = {
  title: '',
  showTitle: false,
  themeName: '',
};

export default withThemes('post-list', {
  default: styles,
  withTitle: withTitleTheme,
})(withStyles(styles, withTitleTheme)(PostList));
