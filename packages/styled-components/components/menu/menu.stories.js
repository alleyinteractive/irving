import React from 'react';
import { action } from '@storybook/addon-actions';
import Menu from '.';

export default {
  component: Menu,
  title: 'Styled Components/Menu',
};

const menuItems = [
  {
    props: {
      id: 1,
      title: "Testing",
      url: "https://google.com",
    },
  },
  {
    props: {
      id: 2,
      title: "Another menu item",
      url: "https://duckduckgo.com",
    },
  },
];
export const BasicExample = () => <Menu location="example">{menuItems}</Menu>;

export const NoItemsExample = () => <Menu location="example">{[]}</Menu>;
