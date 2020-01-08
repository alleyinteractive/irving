import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __, sprintf } from '@wordpress/i18n';
import { UIDConsumer } from 'react-uid';
import Link from 'components/helpers/link';
import classNames from 'classnames';

// Styles
import styles from './magazineStory.css';

const MagazineStory = ({
  postID,
  title,
  coverImage,
  permalink,
  issueDate,
  subscribeLink,
  align,
}) => (
  <UIDConsumer>
    {(id) => (
      <aside className={classNames('magazineStory__wrap', {
        alignleft: 'left' === align,
        alignright: 'right' === align,
        aligncenter: 'center' === align,
      })}
      >
        {0 < postID && (
          <div>
            <h3
              id={`magazineStory-title-${id}`}
              className="magazineStory__title"
            >
              {coverImage.src ? (
                <img
                  src={coverImage.src}
                  alt={title}
                  width={coverImage.width}
                  height={coverImage.height}
                  className="magazineStory__image"
                />
              ) :
                title
              }
            </h3>
            {'' !== issueDate && (
              <p className="magazineStory__issueDate">
                {sprintf(
                  __('This story was part of our %s issue', 'mittr'),
                  issueDate
                )}
              </p>
            )}
            <nav
              aria-label={__('Magazine', 'mittr')}
              className="magazineStory__nav"
            >
              <ul
                aria-label={__('Links', 'mittr-plugin-extension')}
                role="menu"
                className="magazineStory__list"
              >
                {permalink && (
                  <li role="menuitem" className="magazineStory__item">
                    <Link to={permalink} className="magazineStory__link">
                      {__('See the rest of the issue', 'mittr')}
                    </Link>
                  </li>
                )}
                {subscribeLink && (
                  <li role="menuitem" className="magazineStory__item">
                    <Link to={subscribeLink} className="magazineStory__link">
                      {__('Subscribe', 'mittr')}
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </aside>
    )}
  </UIDConsumer>
);

MagazineStory.propTypes = {
  coverImage: PropTypes.shape({
    height: PropTypes.number,
    src: PropTypes.string,
    width: PropTypes.number,
  }),
  issueDate: PropTypes.string,
  permalink: PropTypes.string,
  postID: PropTypes.number,
  title: PropTypes.string,
  subscribeLink: PropTypes.string.isRequired,
  align: PropTypes.string,
};

MagazineStory.defaultProps = {
  postID: 0,
  title: '',
  coverImage: PropTypes.shape({
    height: 0,
    src: '',
    width: 0,
  }),
  permalink: '',
  issueDate: '',
  align: 'left',
};

export default withStyles(styles)(MagazineStory);

