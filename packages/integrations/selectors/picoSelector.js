import { createSelector } from 'reselect';
import { maybeSelect } from './utils';

const picoSelector = (state) => state.integrations.pico;

export const picoLifecycleSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'lifecycle')
);

export const picoContentReadySelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'contentReady')
);

export const picoVisitedSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'visited')
);

export const picoPageInfoSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'pageInfo')
);

export const picoSignalSelector = createSelector(
  picoSelector,
  (branch) => maybeSelect(branch, 'signal')
);
