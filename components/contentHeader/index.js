import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import dashify from 'dashify';
import NProgress from 'nprogress';
import { connect } from 'react-redux';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import useScrollPosition from 'hooks/useScrollPosition';
import { findChildByName } from 'utils/children';
import colors from 'config/css/colors';

// Themes
import styles from './contentHeader.css';
import inlineTheme from './contentHeader--inline.css';
import verticalTheme from './contentHeader--vertical.css';
import simpleTheme from './contentHeader--simple.css';
import './nprogress.css';
import Eyebrow from '../eyebrow';

const ContentHeader = ({
  eyebrow,
  title,
  publishDate,
  deck,
  children,
  headingLevel,
  showFullStory,
  theme,
  themeName,
}) => {
  const video = findChildByName('video', children);
  const image = findChildByName('image', children);
  const byline = findChildByName('byline', children);
  const sponsoredModule = findChildByName('sponsored-module', children);
  const Heading = `h${headingLevel}`;
  const DeckTag = '' === title ? Heading : 'p';

  const [contentPos, setContentPos] = useState({ height: 0, top: 0 });
  const scrollData = useScrollPosition();
  const contentHeaderRef = useRef();

  useEffect(() => {
    if (showFullStory) {
      // Initiate nprogress bar.
      NProgress.configure({
        parent: '#siteHeader',
        minimum: 0,
        template: `
          <div
            class="barContainer"
            style="--topic-color: ${eyebrow.color || colors.purple}"
          >
            <div
              class="bar"
              style="background-color: "
              role="bar" />
          </div>
        `,
      });
      NProgress.set(0);

      // Calculate content height and store in state.
      // We're calculating content height this way because:
      // 1) Parent element is a generic contentArea component
      // 2) We don't want to include the contentFooter
      const contentHeader = contentHeaderRef.current;
      const contentBody = contentHeader.nextElementSibling;

      setContentPos({
        top: contentHeader.getBoundingClientRect().top + window.scrollY,
        height: contentHeader.getBoundingClientRect().height +
        contentBody.getBoundingClientRect().height,
      });
    }
  }, [showFullStory]);

  // Get scroll progress as a number from 0 - 1, to 3 decimal places.
  const contentScrollProgress = showFullStory ?
    // eslint-disable-next-line max-len
    Math.round(((scrollData.y - contentPos.top) / contentPos.height) * 1000) / 1000 : 0;

  // Update nprogress bar if the content area is in view
  if (1 > contentScrollProgress && 0 < contentScrollProgress) {
    NProgress.set(contentScrollProgress);
  } else {
    NProgress.done();
  }

  return (
    <header
      className={theme.wrapper}
      id={dashify(title)}
      ref={contentHeaderRef}
    >
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
  showFullStory: PropTypes.bool.isRequired,
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

const mapStateToProps = (state) => ({
  showFullStory: state.story.showFullStory,
});

const withRedux = connect(
  mapStateToProps
);

export default withThemes('content-header', {
  default: styles,
  inline: inlineTheme,
  isVertical: verticalTheme,
  simple: simpleTheme,
})(withRedux(withStyles(
  styles,
  inlineTheme,
  verticalTheme,
  simpleTheme
)(ContentHeader)));
