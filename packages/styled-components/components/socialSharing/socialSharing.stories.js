import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureSocialSharing as SocialSharing } from '.';

export default {
  component: SocialSharing,
  title: 'Irving/SocialSharing',
};

const platforms = [
  "email",
  "facebook",
  "linkedin",
  "pinterest",
  "reddit",
  "twitter",
  "whatsapp",
];

export const BasicEample = () => <SocialSharing
  cta="Share with friends:"
  platforms={platforms}
  postExcerpt="This is an excerpt"
  postPermalink="http://google.com"
  postTitle="Hello World"
/>;
