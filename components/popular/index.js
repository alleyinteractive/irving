import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from '../helpers/link';
import withThemes from '../hoc/withThemes';

// Themes.
import styles from './popular.css';
import inFeedStyles from './inFeed.css';

const Popular = ({
  popular,
  theme,
  themeName,
}) => {
  const [isFixed, setFixedPosition] = useState(false);
  const [maxWidth, setMaxWidth] = useState(null);
  let nodeOffset;

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (960 < window.innerWidth) {
        const currentOffset = document.documentElement.scrollTop;

        const node = document.getElementById('sidebar--module');
        if (nodeOffset === undefined) {
          nodeOffset = node.getBoundingClientRect().top + window.scrollY;

          // Make sure that the fixed position sidebar is never wider than its parent.
          const sidebarNode = document.getElementById('sidebar__item');
          const sidebarStyle = window.getComputedStyle(sidebarNode, null);
          const sidebarWidth = sidebarStyle.getPropertyValue('width');
          setMaxWidth(sidebarWidth);
        }

        const setPosition = () => {
          if (currentOffset > (nodeOffset - 100)) {
            setFixedPosition(true);
          } else {
            setFixedPosition(false);
          }
        };

        const contentNode = document.getElementById('content--body');

        if (null !== contentNode) {
          const nodeHeight = contentNode.clientHeight;

          if (400 < nodeHeight) {
            setPosition();
          }
        }

        if ('in-feed' === themeName) {
          setPosition();
        }
      }
    });
  }, isFixed);

  return (
    <div
      className={theme.contentWrapper}
      id="sidebar--module"
      style={{
        position: isFixed ? 'fixed' : 'relative',
        top: isFixed ? 100 : 0,
        width: maxWidth,
      }}
    >
      <div className={styles.adUnit}>Ad unit placeholder</div>
      <div className={theme.contentModule}>
        <h3 className={theme.title}>Popular</h3>
        <ul className={theme.stories}>
          {popular.map((item, index) => (
            <li className={theme.story} key={item.title}>
              { 'in-feed' !== themeName && (
                <div className={theme.itemCount}>
                  0{index + 1}.
                </div>
              )}
              <Link to={item.link}>{item.title}</Link>
              <br />
              { 'in-feed' === themeName && (
                <span className={theme.byline}>
                  {item.authorLink && (
                    <Link to={item.authorLink}>{item.author}</Link>
                  )}
                  {! item.authorLink ? item.author : ''}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Popular.propTypes = {
  popular: PropTypes.array.isRequired,
  themeName: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    title: PropTypes.string,
    stories: PropTypes.string,
    story: PropTypes.string,
    byline: PropTypes.string,
  }).isRequired,
};

export default withThemes('popular', {
  default: styles,
  'in-feed': inFeedStyles,
})(withStyles(styles, inFeedStyles)(Popular));
