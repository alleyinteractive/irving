import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { UIDReset, UIDConsumer } from 'react-uid';

// Styles
import styles from './postList.css';

const PostList = ({ children, title, showTitle }) => (
  <UIDReset>
    <UIDConsumer>
      {(id, uid) => {
        const titleID = uid('post-list');
        return (
          <div className={styles.wrapper}>
            {'' !== title && (
              <h2
                className={classNames(styles.title, {
                  'screen-reader-text': ! showTitle,
                })}
                id={titleID}
              >
                {title}
              </h2>
            )}
            <ul className={styles.wrapper} id={'' !== title && titleID}>
              {children.map((child) => (
                <li>{child}</li>
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
};

PostList.defaultProps = {
  title: '',
  showTitle: false,
};

export default withStyles(styles)(PostList);
