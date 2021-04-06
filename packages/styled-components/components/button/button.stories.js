import React from 'react';
import Button from '.';
import Text from '../text';

export default {
  component: Button,
  title: 'Styled Components|Button',
};

// Basic Button Example.
export const BasicExample = () => <Button>Button Example</Button>;

// Basic Button with onClick Handler.
const clickHandler = () => {};
export const OnClickExample = () => <Button onClick={clickHandler}>onClick Button Example</Button>;

// Button example with children.
export const ButtonChildren = () => <Button><Text content="Cool Button" /></Button>;
