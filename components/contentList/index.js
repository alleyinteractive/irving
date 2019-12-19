import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { UIDConsumer } from 'react-uid';
import parse from 'html-react-parser';
import styles from './contentList.css';

const ContentList = ({
  align,
  className,
  listTitle,
  children,
}) => 0 < children.length && (
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
            <h2
              className={classNames('contentList__header', {
                'company-feature': 'company-feature' === className,
              })}
              id={titleID}
            >
              {parse(listTitle)}
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
  align: '',
  listTitle: '',
  className: '',
  children: [],
};

ContentList.propTypes = {
  className: PropTypes.string,
  listTitle: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default withStyles(styles)(ContentList);
