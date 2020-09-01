import { createSelector } from 'reselect';
import { maybeSelect } from './utils';

const coralSelector = (state) => state.integrations.coral;

export const tokenSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'token')
);

export const purgeSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'purgeUser')
);

export const requireUsernameSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'requireUsername')
);

export const requireUpgradeSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'requireUpgrade')
);

export const validationErrorSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'validationError')
);
