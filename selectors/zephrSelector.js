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

export const getFirstName = createSelector(
  zephrSelector,
  (state) => state.user.firstName,
);

export const getLastName = createSelector(
  zephrSelector,
  (state) => state.user.lastName,
);

export const getZephrComponents = createSelector(
  zephrSelector,
  (state) => state.zephrComponents,
);
