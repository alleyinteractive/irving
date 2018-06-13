import React from 'react';
import { hot } from 'react-hot-loader';

import './app.css';

const App = () => (
  <h1>Hello World!</h1>
);

const hotReload = hot(module);
export default hotReload(App);
