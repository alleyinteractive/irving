import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const getRoots = createSelector(
  [
    get('components.defaults'),
  ],
  (defaults) => defaults.map((component) => component.name),
);

export default getRoots;
