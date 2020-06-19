import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureContainer as Container } from '.';

export default {
  component: Container,
  title: 'Irving/Container',
};

export const BasicEample = () => <Container>Basic Example</Container>;
