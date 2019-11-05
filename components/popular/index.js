import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import styles from './popular.css';
import Link from '../helpers/link';
import inFeedStyles from './inFeed.css';

const Popular = ({ popular, theme }) => (
  <div className={theme.wrapper}>
    <h3 className={theme.title}>Popular</h3>
    <ul className={theme.stories}>
      {popular.map((item) => (
        <li className={theme.story} key={item.title}>
          <Link to={item.link}>{item.title}</Link>
          <br />
          <span className={theme.byline}>
            {item.authors.map(
              (author) => (
                { author }
              )
            )}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

Popular.propTypes = {
  popular: PropTypes.array.isRequired,
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
