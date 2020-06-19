import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureMenu as Menu } from '.';

export default {
  component: Menu,
  title: 'Irving/Menu',
};

const menuItems = [
  {
    title: "Testing",
    url: "https://google.com",
  }
];
export const BasicExample = () => <Menu location="example">{menuItems}</Menu>;

export const NoItemsExample = () => <Menu location="example">{[]}</Menu>;
