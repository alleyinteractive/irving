import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from '../helpers/link';
import withThemes from '../hoc/withThemes';

// Themes.
import styles from './popular.css';
import inFeedStyles from './inFeed.css';

const Popular = ({ popular, theme, themeName }) => (
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
              {item.author}
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

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
