import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import styles from './contentHeader.css';

const ContentHeader = ({
  title, publishDate, deck, children,
}) => {
  const image = findChildByName('image', children);
  const byline = findChildByName('byline', children);
  return (
    <header className={styles.wrapper}>
      <div className={styles.intro}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.deck}>{deck}</p>
        <div className={styles.meta}>
          {byline}
          <div className={styles.publishDate}>{publishDate}</div>
        </div>
      </div>
      <figure className={styles.image}>{image}</figure>
    </header>
  );
};

ContentHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  deck: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(ContentHeader);
