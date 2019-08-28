import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import uniqueId from 'react-html-id';
import styles from './contentList.css';

class ContentList extends React.PureComponent {
  constructor() {
    super();
    // Enable Unique ID support for this class
    uniqueId.enableUniqueIds(this);
  }

  render() {
    const { listTitle, align, children } = this.props;
    return (
      <div
        className={classNames(styles.wrap, {
          'content-right': 'right' === align,
          'content-left': 'left' === align,
          'content-center': 'center' === align,
        })}
      >
        <h2 className={styles.header} id={this.nextUniqueId()}>
          {listTitle}
        </h2>
        <ul className={styles.listWrap} aria-labelledby={this.lastUniqueId()}>
          {children}
        </ul>
      </div>
    );
  }
}

ContentList.propTypes = {
  listTitle: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(ContentList);
