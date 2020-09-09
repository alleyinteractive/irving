import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import queryString from 'query-string';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import toReactElement from '@irvingjs/core/utils/toReactElement';
import Link from '../link';
import * as defaultStyles from './themes/default';

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
    platformShareLinks,
    theme,
    title,
    url,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    IconWrapper,
    SocialSharingItemWrapper,
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

  const getShareUrl = (platform) => {
    if (platformShareLinks[platform]) {
      return platformShareLinks[platform];
    }

    if (socialUrlMap[platform]) {
      return socialUrlMap[platform];
    }

    return '#';
  };

  if (0 === platforms.length) {
    return null;
  }

  const getShareTarget = (platform) => {
    if ('email' === platform) {
      return '_self';
    }
    return '_blank';
  };

  const items = platforms.map((platform) => ({
    platform,
    shareUrl: getShareUrl(platform),
    target: getShareTarget(platform),
    icon: toReactElement({
      name: `irving/${platform}-icon`,
      config: {
        title: sprintf( // Translators: %1$s - platform.
          __('Share on %1$s', 'irving-styled-components'),
          platform
        ),
      },
      children: [],
    }),
  }));

  return (
    <SocialSharingWrapper {...standardProps}>
      <SocialSharingList>
        {items.map(({
          icon,
          platform,
          shareUrl,
          target,
        }) => (
          <SocialSharingItemWrapper key={platform} className={platform}>
            <Link
              data-gtm-event="Engagement"
              data-gtm-category="Share"
              data-gtm-label={platform}
              href={shareUrl}
              target={target}
            >
              <IconWrapper className={platform}>
                {icon}
              </IconWrapper>
            </Link>
          </SocialSharingItemWrapper>
        ))}
      </SocialSharingList>
    </SocialSharingWrapper>
  );
};

SocialSharing.defaultProps = {
  ...standardDefaultProps,
  theme: defaultStyles,
  description: '',
  imageUrl: '',
  platforms: ['email', 'facebook', 'twitter'],
  platformShareLinks: {},
  style: {},
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
  platforms: PropTypes.arrayOf(PropTypes.string),
  /**
   * An object containing social platforms as keys and share links as values.
   */
  platformShareLinks: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
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
