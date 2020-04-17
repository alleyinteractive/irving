import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';

const Meta = ({
  theme,
  topicLink,
  postDate,
  topic,
  color,
}) => (
  <div className={theme.meta}>
    <div className={theme.eyebrow}>
      {'' !== topicLink ? (
        <Link
          className={theme.eyebrowText}
          to={topicLink}
          style={{ color }}
        >
          <span className="screen-reader-text">
            {__('Categorized in ', 'mittr')}
          </span>
          {topic}
        </Link>
      ) : (
        <span
          className={theme.eyebrowText}
          style={{ color }}
        >
          <span className="screen-reader-text">
            {__('Categorized in ', 'mittr')}
          </span>
          {topic}
        </span>
      )}
      {'' !== postDate && <time className={theme.timestamp}>{postDate}</time>}
    </div>
  </div>
);

Meta.propTypes = {
  color: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string.isRequired,
};

export default Meta;
