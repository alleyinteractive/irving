import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  PureSocialSharing as SocialSharing,
  SupportedPlatforms,
} from '.';

export default {
  component: SocialSharing,
  title: 'Irving/SocialSharing',
};

// eslint-next-line max-len
const title = "Irving is a ReactJS based, isomorphically rendered, headless CMS frontend application.";
const description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima vel accusantium odit et minus. Enim quas sint autem consectetur recusandae repellendus veniam natus alias! Ipsam minus, possimus tempora ab illo.";
const url = "https://irvingjs.org"
const imageUrl = 'https://placehold.it/1200x630';

export const BasicEample = () => <SocialSharing
  platforms={SupportedPlatforms}
  description={description}
  url={url}
  title={title}
/>;
