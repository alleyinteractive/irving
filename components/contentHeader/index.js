import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import dashify from 'dashify';
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
    <header className={theme.wrapper} id={dashify(title)}>
      <div className={theme.intro}>
        {eyebrow.content && (
          <Eyebrow
            customEyebrow={eyebrow.customEyebrow}
            subTopic={eyebrow.subTopic}
            subTopicLink={eyebrow.subTopicLink}
            themeName="Full Story"
            topic={eyebrow.content}
            topicLink={eyebrow.link}
            color={eyebrow.color}
          />
        )}
        {'' !== title && (
          <Heading className={theme.title}>{title}</Heading>
        )}
        {deck && (
          <DeckTag className={theme.deck}>{parse(deck)}</DeckTag>
        )}
        {'inline' !== themeName && (
          <div className={theme.meta}>
            {byline}
            <div className={theme.publishDate}>{publishDate}</div>
          </div>
        )}
      </div>
      {image && <div className={theme.image}>{image}</div>}
      {video && <div className={theme.image}>{video}</div>}
      {sponsoredModule && (
        <div className={theme.sponsoredModule} id="sponsored-content--module">
          {sponsoredModule}
        </div>
      )}
    </header>
  );
};

ContentHeader.propTypes = {
  eyebrow: PropTypes.shape({
    link: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.string,
    customEyebrow: PropTypes.string,
    subTopic: PropTypes.string,
    subTopicLink: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  deck: PropTypes.string,
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
    customEyebrow: '',
    link: '',
    subTopic: '',
    subTopicLink: '',
  },
  headingLevel: 1,
  themeName: '',
  deck: '',
};

export default withThemes('content-header', {
  default: styles,
  inline: inlineTheme,
  isVertical: verticalTheme,
  simple: simpleTheme,
})(withStyles(styles, inlineTheme, verticalTheme, simpleTheme)(ContentHeader));
