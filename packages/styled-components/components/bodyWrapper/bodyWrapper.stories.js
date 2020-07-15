import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureComponent as BodyWrapper } from '.';

export default {
  component: BodyWrapper,
  title: 'Styled Components|BodyWrapper',
};

export const BasicExample = () => (
  <BodyWrapper
    bodyClasses={[
      'one',
      'two',
      'three'
    ]}
  >
    <div>👋 Hi, I'm a child of the BodyWrapper Component.</div>
  </BodyWrapper>
);
