import { createSelector } from 'reselect';
import get from 'lodash/get';

export const zephrDataLayerSelector = (state) => state.zephrDataLayer;

export const getZephrDataLayerIsLoading = createSelector(
  zephrDataLayerSelector,
  (state) => get(state, 'isLoading', false),
);

export const getZephrDataLayer = createSelector(
  zephrDataLayerSelector,
  (state) => get(state, 'dataLayer', {}),
);
