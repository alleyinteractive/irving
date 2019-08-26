import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import styles from './contentList.css';
import ContentListItem from './contentListItem';

const ContentList = (props) => {
  const { listTitle, align, children } = props;
  return (
    <div className={classNames(styles.wrap, align)}>
      <h4 className={styles.header}>{listTitle}</h4>
      <ul className={styles.listWrap}>
        {children.map((child) => (
          <ContentListItem
            key={child.title}
            title={child.title}
            url={child.url}
            description={child.description}
          />
        ))}
      </ul>
    </div>
  );
};

ContentList.propTypes = {
  listTitle: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(ContentList);
