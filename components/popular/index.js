/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from '../helpers/link';
import withThemes from '../hoc/withThemes';

// Themes.
import styles from './popular.css';
import inFeedStyles from './inFeed.css';

const Popular = ({ popular, theme, themeName }) => {
  const [isFixed, setFixedPosition] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const node = document.getElementById('sticky__content-module');
      const nodeOffset = node.getBoundingClientRect().top;
      console.log(100 <= nodeOffset);

      if (100 >= nodeOffset) {
        setFixedPosition(true);
      }
      
      if (100 <= nodeOffset) {
        setFixedPosition(false);
      }
    });
  }, isFixed);

  console.log(isFixed);

  return (
    <div
      className={theme.wrapper}
      id="sticky__content-module"
      style={{
        position: isFixed ? 'fixed' : 'relative',
        top: 82,
      }}
    >
      {/* @todo consider moving ad placeholder to its own component. */}
      <div className={styles.leaderboard}>Ad unit placeholder</div>
      <div className={theme.wrapper}>
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
