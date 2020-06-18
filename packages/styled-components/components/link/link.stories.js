import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureLink as Link } from '.';

export default {
  component: Link,
  title: 'Irving/Link',
};

export const PlainTextExample = () => <Link href="#">Hello World</Link>;