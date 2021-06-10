import { createSelector } from 'reselect';
import { maybeSelect } from './utils';

const gtmSelector = (state) => state.integrations.gtm;

export const containerIdSelector = createSelector(
  gtmSelector,
  (branch) => maybeSelect(branch, 'gtmContainerId'),
);
