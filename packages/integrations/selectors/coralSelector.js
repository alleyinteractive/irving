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

export const requireUsernameSelector = createSelector(
  coralSelector,
  (branch) => {
    if (branch) {
      return branch.requireUsername;
    }

    return undefined;
  }
);

export const validationErrorSelector = createSelector(
  coralSelector,
  (branch) => {
    if (branch) {
      return branch.validationError;
    }

    return undefined;
  }
);
