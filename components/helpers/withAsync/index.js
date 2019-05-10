import universal from 'react-universal-component';
import React from 'react';
import AsyncRenderer from './asyncRenderer';
import config from './config';

const withAsync = (importer, componentName = false) => universal(
  importer,
  {
    ...config,
    render: (props, module, isLoading, error) => (
      <AsyncRenderer
        componentProps={props}
        Component={module}
        isComponentLoading={isLoading}
        isComponentError={error}
        componentName={componentName}
      />
    ),
  }
);

export default withAsync;
