import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureLogo as Logo } from '.';

export default {
  component: Logo,
  title: 'Styled Components|Logo',
};

export const BasicEample = () => <Logo siteName="Example Site" />;
export const LogoEample = () => <Logo logoImageUrl="https://source.unsplash.com/random/300x300" siteName="Example Site" />;
