import { createSelector } from 'reselect';
import { maybeSelect } from './utils';

const picoSelector = (state) => state.integrations.pico;

export const picoLoadedSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'isLoaded')
);

export const picoReadySelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'isReady')
);

export const picoContentReadySelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'contentReady')
);

export const picoUpdatedSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'updated')
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
