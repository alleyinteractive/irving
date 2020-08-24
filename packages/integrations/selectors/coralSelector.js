import { createSelector } from 'reselect';

const coralSelector = (state) => state.integrations.coral;

export const tokenSelector = createSelector(
  coralSelector,
  (branch) => {
    if (branch) {
      return branch.token;
    }

    return undefined;
  }
);

export const purgeSelector = createSelector(
  coralSelector,
  (branch) => {
    if (branch) {
      return branch.purgeUser;
    }

    return undefined;
  }
);
