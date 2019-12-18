import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { UIDConsumer } from 'react-uid';
import styles from './contentList.css';

const ContentList = ({ listTitle, align, children }) => 0 < children.length && (
  <UIDConsumer>
    {(id, uid) => {
      const titleID = uid('contentList');
      return (
        <div
          className={classNames('contentList__wrap', {
            'content-right': 'right' === align,
            'content-left': 'left' === align,
            'content-center': 'center' === align,
          })}
        >
          {listTitle && (
            <h2 className="contentList__header" id={titleID}>
              {listTitle}
            </h2>
          )}
          <ul className="contentList__listWrap" aria-labelledby={titleID}>
            {children}
          </ul>
        </div>
      );
    }}
  </UIDConsumer>
);

ContentList.defaultProps = {
  listTitle: '',
  children: [],
};

ContentList.propTypes = {
  listTitle: PropTypes.string,
  align: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default withStyles(styles)(ContentList);
