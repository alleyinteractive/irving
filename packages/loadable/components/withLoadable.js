import React from 'react';
import Loadable from 'react-loadable';
import Loader from '@irvingjs/styled-components/components/loader';

const withLoadable = (importPath) => Loadable({
  loader: () => import(importPath),
  loading: () => (
    <Loader />
  ),
  timeout: 5000,
});

export default withLoadable;
