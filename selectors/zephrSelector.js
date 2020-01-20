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
