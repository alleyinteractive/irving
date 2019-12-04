import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';

// Themes
import styles from './contentHeader.css';
import inlineTheme from './contentHeader--inline.css';
import verticalTheme from './contentHeader--vertical.css';
import simpleTheme from './contentHeader--simple.css';
import Eyebrow from '../eyebrow';

const ContentHeader = ({
  eyebrow,
  title,
  publishDate,
  deck,
  children,
  headingLevel,
  theme,
  themeName,
}) => {
  const video = findChildByName('video', children);
  const image = findChildByName('image', children);
  const byline = findChildByName('byline', children);
  const sponsoredModule = findChildByName('sponsored-module', children);
  const Heading = `h${headingLevel}`;
  const DeckTag = '' === title ? Heading : 'p';

  return (
    <header className={theme.wrapper} id="content--header--wrapper">
      <div className={theme.intro} id="content--header">
        {eyebrow.content && (
          <Eyebrow
            // Current I don't see customEyebrow being set in the api, just content.
            customEyebrow={eyebrow.customEyebrow}
            subTopic={eyebrow.subTopic}
            subTopicLink={eyebrow.subTopicLink}
            themeName="Full Story"
            topic={eyebrow.content}
            topicLink={eyebrow.link}
            color={eyebrow.color}
          />
        )}
        {'' !== title && <Heading className={theme.title}>{title}</Heading>}
        <DeckTag className={theme.deck}>{deck}</DeckTag>
        {'inline' !== themeName && (
          <div className={theme.meta}>
            {byline}
            <div className={theme.publishDate}>{publishDate}</div>
          </div>
        )}
      </div>
      {sponsoredModule && (
        <div className={styles.sponsoredModule} id="sponsored-content--module">
          {sponsoredModule}
        </div>
      )}
      <div className={theme.image}>{image}</div>
      {video}
    </header>
  );
};

ContentHeader.propTypes = {
  eyebrow: PropTypes.shape({
    link: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  deck: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headingLevel: PropTypes.number,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    intro: PropTypes.string,
    title: PropTypes.string,
    deck: PropTypes.string,
    meta: PropTypes.string,
    publishDate: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  themeName: PropTypes.string,
};

ContentHeader.defaultProps = {
  eyebrow: {
    color: '#000000',
    content: '',
    link: '',
  },
  headingLevel: 1,
  themeName: '',
};

export default withThemes('content-header', {
  default: styles,
  inline: inlineTheme,
  isVertical: verticalTheme,
  simple: simpleTheme,
})(withStyles(styles, inlineTheme, verticalTheme)(ContentHeader));
