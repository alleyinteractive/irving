import React from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import favicon from 'assets/images/favicon.ico';

import styles from './app.css';

const App = () => (
  <React.Fragment>
    <Helmet>
      <link rel="shortcut icon" href={favicon} />
    </Helmet>
    <h1>Hello World!</h1>
  </React.Fragment>
);

const hotReload = hot(module);
const wrapWithStyles = withStyles(styles);
export default hotReload(wrapWithStyles(App));
