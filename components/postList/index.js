import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import classNames from 'classnames';
import { UIDReset, UIDConsumer } from 'react-uid';
import kebabCase from 'lodash.kebabcase';
import Link from 'components/helpers/link';
import RawHTML from 'components/rawHTML';
// Styles
import styles from './postList.css';
import withTitleTheme from './postList--withTitle.css';

const PostList = ({
  children,
  headline,
  inTheMedia,
  posts,
  postType,
  title,
  showTitle,
  theme,
  themeName,
  viewMoreLink,
}) => (
  <UIDReset>
    <UIDConsumer>
      {(id, uid) => {
        const titleID = '' !== title ? kebabCase(title) : uid('post-list');
        const useScreenReaderTitle = ! showTitle && 'withTitle' !== themeName;
        return (
          <>
            {/* If there's no children, this is coming from the GB Post List block,
                otherwise, its being sent from the PostList class.
            */}
            {! children.length ? (
              <div className="postList__wrapper">
                {headline && (
                  <h3 className="section-header">{headline}</h3>
                )}
                <ul className="postList__list">
                  {(posts && posts.length) && posts.map((post, index) => (
                    <li className="postList__listItem">
                      <Link
                        className="postList__title"
                        id={`${kebabCase(post.title)}-${index}`}
                        to={post.url}
                      >
                        {post.title}
                      </Link>
                      {('press_release' === postType &&
                        inTheMedia && post.eyebrow) && (
                        <span>{`(${post.eyebrow})`}</span>
                      )}
                      {('press_release' === postType &&
                        inTheMedia && post.deck) && (
                        <p><i>{post.deck}</i></p>
                      )}
                      {('job' === postType && post.location) && (
                        <p className={theme.content}>{post.location}</p>
                      )}
                      {('job' !== postType && post.date) && (
                        <p className={theme.content}>{post.date}</p>
                      )}
                    </li>
                  ))}
                </ul>
                {React.createElement(RawHTML, {
                  content: viewMoreLink,
                  className: 'view-more-link',
                })}
              </div>
            ) : (
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
            )}
          </>
        );
      }}
    </UIDConsumer>
  </UIDReset>
);

PostList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  headline: PropTypes.string,
  inTheMedia: PropTypes.bool,
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  postType: PropTypes.string,
  showTitle: PropTypes.bool,
  title: PropTypes.string,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string,
  viewMoreLink: PropTypes.string,
};

PostList.defaultProps = {
  headline: '',
  inTheMedia: false,
  posts: [],
  postType: '',
  title: '',
  showTitle: false,
  themeName: '',
  viewMoreLink: '',
};

export default withThemes('post-list', {
  default: styles,
  withTitle: withTitleTheme,
})(withStyles(styles, withTitleTheme)(PostList));
