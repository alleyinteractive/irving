import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import queryString from 'query-string';
import getStandardProps from '@irvingjs/styled/utils/getStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import SocialSharingItem from './socialSharingItem';
import * as defaultStyles from './themes/default';

/**
 * Supported platforms.
 *
 * @type {Array}
 */
export const SupportedPlatforms = [
  'email',
  'facebook',
  'linkedin',
  'pinterest',
  'reddit',
  'twitter',
  'whatsapp',
];

/**
 * Social sharing.
 *
 * Displays a list of platforms to share content on.
 */
const SocialSharing = (props) => {
  const {
    description,
    imageUrl,
    platforms,
    theme,
    title,
    url,
  } = props;
  const standardProps = getStandardProps(props);
  const {
    SocialSharingList,
    SocialSharingWrapper,
  } = theme;

  const getEmailUrl = `mailto:?${
    queryString.stringify({
      subject: title,
      body: url,
    })
  }`;

  const getFacebookUrl = `https://www.facebook.com/sharer.php?${
    queryString.stringify({
      u: url,
    })
  }`;

  const getLinkedInUrl = `https://www.linkedin.com/shareArticle/?${
    queryString.stringify({
      url,
      title,
      summary: description,
    })
  }`;

  const getPinterestUrl = `https://pinterest.com/pin/create/button?${
    queryString.stringify({
      url,
      media: imageUrl,
      description,
    })
  }`;

  const getRedditUrl = `http://www.reddit.com/submit/?${
    queryString.stringify({
      title,
      url,
    })
  }`;

  const getTwitterUrl = `https://twitter.com/intent/tweet?${
    queryString.stringify({
      text: title,
      url,
    })
  }`;

  const whatsAppStory = sprintf( // Translators: %1$s - article title, %2$s - article url.
    __('Check out this story: %1$s %2$s', 'irving-styled-components'),
    title,
    url
  );

  const getWhatsAppUrl = `https://api.whatsapp.com/send/?${
    queryString.stringify({
      text: whatsAppStory,
    })
  }`;

  const socialUrlMap = {
    email: getEmailUrl,
    facebook: getFacebookUrl,
    linkedin: getLinkedInUrl,
    pinterest: getPinterestUrl,
    reddit: getRedditUrl,
    twitter: getTwitterUrl,
    whatsapp: getWhatsAppUrl,
  };

  return (
    <SocialSharingWrapper {...standardProps}>
      {platforms && 0 !== platforms.length && (
        <SocialSharingList>
          {platforms.map((platform) => (
            <SocialSharingItem
              key={platform}
              platform={platform}
              theme={theme}
              title={platform}
              url={socialUrlMap[platform]}
            />
          ))}
        </SocialSharingList>
      )}
    </SocialSharingWrapper>
  );
};

SocialSharing.defaultProps = {
  ...standardDefaultProps,
  theme: defaultStyles,
  description: '',
  imageUrl: '',
  platforms: ['email', 'facebook', 'twitter'],
  title: '',
  url: '',
};

SocialSharing.propTypes = {
  ...standardPropTypes,
  /**
   * Description of the shared content.
   */
  description: PropTypes.string,
  /**
   * Preview image for the shared content.
   */
  imageUrl: PropTypes.string,
  /**
   * An array of social sharing platforms.
   */
  platforms: PropTypes.arrayOf(PropTypes.oneOf(SupportedPlatforms)),
  /**
   * Title of the shared content.
   */
  title: PropTypes.string,
  /**
   * URL of the shared content.
   */
  url: PropTypes.string,
};

const themeMap = {
  default: defaultStyles,
};

export {
  SocialSharing as Component,
  themeMap,
};

export default SocialSharing;
