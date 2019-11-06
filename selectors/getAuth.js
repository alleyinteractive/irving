import { createSelector } from 'reselect';

export const authSelector = (state) => state.user.authorization;

export const isValid = createSelector(
  authSelector,
  (state) => state.isValid,
);

export const validTo = createSelector(
  authSelector,
  (state) => state.validTo,
);

export const authHeader = createSelector(
  authSelector,
  (state) => state.header,
);
