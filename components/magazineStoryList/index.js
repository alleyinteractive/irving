import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __, sprintf } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './magazineStory.css';

const magazineStoryList = ({
  postID,
  title,
  coverImage,
  permalink,
  issueDate,
}) => (
  <div>
    {0 < postID && (
      <div className={styles.wrap}>
        <h3 className={styles.title}>
          <Link to={permalink}>
            {coverImage.src ? (
              <img
                src={coverImage.src}
                alt={title}
                width={coverImage.width}
                height={coverImage.height}
                className={styles.image}
              />
            ) :
              title
            }
          </Link>
        </h3>
        <nav
          aria-label={__('Magazine', 'mittr')}
          className="magazineStoryList__nav"
        >
          {'' !== issueDate && (
            <p className={styles.issueDate}>
              {sprintf(
                __('This story was part of our %s issue', 'mittr'),
                issueDate
              )}
            </p>
          )}
          <ul
            aria-label={__('Links', 'mittr-plugin-extension')}
            role="menu"
            className={styles.list}
          >
            {permalink && (
              <li role="menuitem" className={styles.item}>
                <Link to={permalink} className={styles.link}>
                  {__('See the rest of the issue', 'mittr')}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    )}
  </div>
);

magazineStoryList.propTypes = {
  coverImage: PropTypes.shape({
    height: PropTypes.number,
    src: PropTypes.string,
    width: PropTypes.number,
  }),
  issueDate: PropTypes.string,
  permalink: PropTypes.string,
  postID: PropTypes.number,
  title: PropTypes.string,
};

magazineStoryList.defaultProps = {
  postID: 0,
  title: '',
  coverImage: PropTypes.shape({
    height: 0,
    src: '',
    width: 0,
  }),
  permalink: '',
  issueDate: '',
};

export default withStyles(styles)(magazineStoryList);

