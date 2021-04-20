import React from 'react';
import { action } from '@storybook/addon-actions';
import Head from '.';

export default {
  component: Head,
  title: 'Styled Components/Head',
};

const children = [
  <title>Hello World</title>,
];

export const BasicEample = () => <Head>{children}</Head>;
