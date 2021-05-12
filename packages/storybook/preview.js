import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

window.__ENV__ = window.__ENV__ ? window.__ENV__ : {};

addDecorator(withInfo);
