import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureComponent as Menu } from '.';

export default {
  component: Menu,
  title: 'Styled Components|Menu',
};

const menuItems = [
  {
    title: "Testing",
    url: "https://google.com",
  }
];
export const BasicExample = () => <Menu location="example">{menuItems}</Menu>;

export const NoItemsExample = () => <Menu location="example">{[]}</Menu>;
