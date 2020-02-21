import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import Link from '../helpers/link';
import withThemes from '../hoc/withThemes';

// Themes.
import styles from './popular.css';
import inFeedStyles from './popular--inFeed.css';

const Popular = ({
  popular,
  theme,
  themeName,
}) => {
  const [popularToRender, setPopularToRender] = useState(popular);
  useEffect(() => {
    const windowSizeChanged = () => setPopularToRender(
      (700 >= window.innerHeight) ?
        popular.slice(0, 2) :
        popular
    );
    windowSizeChanged();
    window.addEventListener('resize', windowSizeChanged);
  }, []);
  return (
    <div
      className={theme.contentWrapper}
    >
      <div className={theme.contentModule}>
        <h3 className={theme.title}>{__('Popular', 'mittr')}</h3>
        <ol className={theme.stories}>
          {popularToRender.map((item) => (
            <li className={theme.story} key={item.title}>
              <Link to={item.link} className={theme.itemTitle}>
                {item.title}
              </Link>
              { 'inFeed' === themeName && (
                <span className={theme.byline}>
                  {item.authorLink && (
                    <Link to={item.authorLink}>{item.author}</Link>
                  )}
                  {! item.authorLink ? item.author : ''}
                </span>
              )}
            </li>
          ))}
        </ol>
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
  inFeed: inFeedStyles,
})(withStyles(styles, inFeedStyles)(Popular));
