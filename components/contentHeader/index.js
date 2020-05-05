import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import dashify from 'dashify';
import NProgress from 'nprogress';
import { connect } from 'react-redux';
import { withStyles } from 'critical-style-loader/lib';
import { actionUpdateContentPos } from 'actions';
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
  children,
  contentPos,
  deck,
  dispatchUpdateContentPos,
  eyebrow,
  headingLevel,
  publishDate,
  showFullStory,
  theme,
  themeName,
  title,
}) => {
  const video = findChildByName('video', children);
  const image = findChildByName('image', children);
  const byline = findChildByName('byline', children);
  const sponsoredModule = findChildByName('sponsored-module', children);
  const Heading = `h${headingLevel}`;
  const DeckTag = '' === title ? Heading : 'p';

  const scrollData = useScrollPosition();
  const contentHeaderRef = useRef();

  useEffect(() => {
    const contentHeader = contentHeaderRef.current;
    const contentBody = contentHeader.nextElementSibling;

    dispatchUpdateContentPos({
      top: contentHeader.getBoundingClientRect().top + window.scrollY,
      height: contentHeader.getBoundingClientRect().height +
        contentBody.getBoundingClientRect().height,
    });

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
    }
  }, [showFullStory]);

  // eslint-disable-next-line max-len
  const contentScrollProgress = (scrollData.y - contentPos.top) / contentPos.height;
  const contentInView = 1 > contentScrollProgress && 0 < contentScrollProgress;

  // Update nprogress bar if the content area is in view
  if (showFullStory) {
    if (contentInView) {
      NProgress.set(Math.round(contentScrollProgress * 1000) / 1000);
    } else {
      NProgress.done();
    }
  }

  return (
    <header
      className={theme.wrapper}
      id={dashify(title)}
      ref={contentHeaderRef}
    >
      <div className={theme.intro}>
        {(eyebrow.content || eyebrow.customEyebrow) && (
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
  contentPos: PropTypes.object.isRequired,
  deck: PropTypes.string,
  dispatchUpdateContentPos: PropTypes.func.isRequired,
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
  contentPos: state.contentPosition,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateContentPos: (height) => {
    dispatch(actionUpdateContentPos(height));
  },
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
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
