import { createSelector } from 'reselect';

export const zephrRulesSelector = (state) => state.zephrRules;

export const getZephrComponents = createSelector(
  zephrRulesSelector,
  (state) => state.components,
);
