import { createSelector } from 'reselect';
import { maybeSelect } from './utils';

const picoSelector = (state) => state.integrations.pico;

export const picoLoadedSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'loaded')
);

export const picoPageInfoSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'pageInfo')
);

export const picoScriptAddedSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'scriptAdded')
);

export const picoSignalSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'signal')
);
