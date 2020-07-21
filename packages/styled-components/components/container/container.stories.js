import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureComponent as Container } from '.';

export default {
  component: Container,
  title: 'Styled Components|Container',
};

export const BasicEample = () => <Container>Basic Example</Container>;
