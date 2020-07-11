import React from 'react';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import stats from './dist/react-loadable.json';

export default function getAppTemplateVars(templateVars) {
  const {
    irvingHead,
    Wrapper: AppWrapper,
  } = templateVars;
  const modules = [];

  return {
    Wrapper: () => (
      <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
        <AppWrapper />
      </Loadable.Capture>
    ),
    irvingHead: () => (
      `${irvingHead}${getBundles(stats, modules)}`
    ),
  };
}
