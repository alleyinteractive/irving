import { createSelector } from 'reselect';

const coralSelector = (state) => state.integrations.coral;

function maybeSelect(selector, key) {
  if (selector) {
    return selector[key];
  }
  return undefined;
}

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
