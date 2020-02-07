import { createSelector } from 'reselect';

export const zephrSelector = (state) => state.zephr;

export const getIsLoading = createSelector(
  zephrSelector,
  (state) => state.isLoading,
);

export const getForms = createSelector(
  zephrSelector,
  (state) => state.forms,
);

export const getCached = createSelector(
  zephrSelector,
  (state) => state.cached,
);

export const getUser = createSelector(
  zephrSelector,
  (state) => state.user,
);

export const getProfile = createSelector(
  zephrSelector,
  (state) => state.user.profile,
);

export const getFirstName = createSelector(
  zephrSelector,
  (state) => state.user.profile.firstName,
);

export const getLastName = createSelector(
  zephrSelector,
  (state) => state.user.profile.lastName,
);
