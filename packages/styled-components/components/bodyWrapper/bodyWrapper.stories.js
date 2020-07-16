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
    className="main"
  >
    <div>
      <p>👋 Hi, I'm a child of the BodyWrapper Component.</p>
      <p> The purposes of the BodyWrapper component are to:</p>
      <ul>
          <li>Allow for adding unique classnames to the <code>&lt;body&gt;</code> element.</li>
          <li>Provide a <code>&lt;main&gt;</code> element wrapper element for page content.</li>
      </ul>
    </div>
  </BodyWrapper>
);
