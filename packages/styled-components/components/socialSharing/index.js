import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import queryString from 'query-string';
import withThemes from '@irvingjs/styled/components/withThemes';
import SocialSharingItem from './socialSharingItem';
import * as defaultStyles from './themes/default';

const SocialSharing = (props) => {
  const {
    cta,
    platforms,
    postExcerpt,
    postPermalink,
    postThumbnail,
    postTitle,
    theme,
  } = props;

  const {
    SocialSharingList,
    SocialSharingWrapper,
  } = theme;

  const getEmailUrl = queryString.stringify(
    {
      subject: postTitle,
      body: postPermalink,
    },
    'mailto:'
  );

  const getFacebookUrl = `https://www.facebook.com/sharer.php?${
    queryString.stringify({
      u: postPermalink,
    })
  }`;

  const getLinkedInUrl = `https://www.linkedin.com/shareArticle/?${
    queryString.stringify({
      url: postPermalink,
      title: postTitle,
      summary: postExcerpt,
    })
  }`;

  const getPinterestUrl = `https://pinterest.com/pin/create/button?${
    queryString.stringify({
      url: postPermalink,
      media: postThumbnail,
      description: postExcerpt,
    })
  }`;

  const getRedditUrl = `http://www.reddit.com/submit/?${
    queryString.stringify({
      title: postTitle,
      url: postPermalink,
    })
  }`;

  const getTwitterUrl = `https://twitter.com/intent/tweet?${
    queryString.stringify({
      text: postTitle,
      url: postPermalink,
    })
  }`;

  const whatsAppStory = sprintf( // Translators: %1$s - article title, %2$s - article url.
    __('Check out this story: %1$s %2$s', 'irving'),
    postTitle,
    postPermalink
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
    <SocialSharingWrapper>
      <span>{cta}</span>
      {platforms && 0 !== platforms.length && (
        <SocialSharingList>
          {platforms.map((platform) => (
            <SocialSharingItem
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

SocialSharing.propTypes = {
  /**
   * An array of social sharing platforms
   */
  platforms: PropTypes.array.isRequired,
  /**
   * Excerpt for the post
   */
  postExcerpt: PropTypes.string,
  /**
   * Permalink for the post
   */
  postPermalink: PropTypes.string.isRequired,
  /**
   * Tnumbnail for the post
   */
  postThumbnail: PropTypes.string,
  /**
   * Title for the post
   */
  postTitle: PropTypes.string.isRequired,
  /**
   * CTA for social sharing
   */
  cta: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object.isRequired,
};

SocialSharing.defaultProps = {
  postExcerpt: '',
  postThumbnail: '',
  cta: '',
};

const socialSharingThemeMap = {
  default: defaultStyles,
};

export default withThemes(socialSharingThemeMap)(SocialSharing);
