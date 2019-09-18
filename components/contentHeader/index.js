import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import styles from './contentHeader.css';

const ContentHeader = ({
  title,
  publishDate,
  deck,
  children,
  headingLevel,
}) => {
  const image = findChildByName('image', children);
  const byline = findChildByName('byline', children);
  const Heading = `h${headingLevel}`;
  const DeckTag = '' === title ? Heading : 'p';

  return (
    <header className={styles.wrapper}>
      <div className={styles.intro}>
        {'' !== title && <Heading className={styles.title}>{title}</Heading>}
        <DeckTag className={styles.deck}>{deck}</DeckTag>
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
  headingLevel: PropTypes.number,
};

ContentHeader.defaultProps = {
  headingLevel: 1,
};

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(ContentHeader);
