import { css } from 'styled-components';
import rem from './rem';
/**
 * Mixins for generating CSS grid styles with IE fallbacks
 *
 */
export const display = `
    display: flex;
    flex-wrap: wrap;

    @supports (display: grid) {
      display: grid;
    }
`;

/**
 * A mixin for generating CSS grid column styles with flexbox fallback for IE.
 * @param {integer} columns the number of columns.
 * @param {integer} gap the gap between columns and rows.
 */
export const columnsEqual = (columns, gap) => css`
  grid-gap: ${rem(gap)};
  grid-template-columns: repeat(${columns}, minmax(0,1fr));
`;

/**
 * A mixin for generating CSS grid column styles.
 * @param {string} columns the columns value to use.
 * @param {integer} gap the gap between columns and rows.
 */
export const columnsCustom = (columns, gap) => css`
  grid-gap: ${rem(gap)};
  grid-template-columns: ${columns};
`;

/**
 * A mixin for generating equal CSS grid row styles.
 * @param {integer} rows the number of rows
 */
export const rowsEqual = (rows) => css`
  grid-template-rows: repeat(${rows}, 1fr);
`;

/**
 * A mixin for generating custom CSS grid row styles.
 * @param {string} rows the rows value to use.
 * grid columns
 */
export const rowsCustom = (rows) => css`
  grid-template-rows: ${rows};
`;

/**
 * A mixin for generating CSS grid span styles, with flexbox fallback for IE.
 * @param {array|string} columns the grid-column start and end values, per CSS Grid spec, ie. [1, 4]
 * @param {number} gridColumns the number of columns set on the container element
 * @param {number|array} gridGap the grid-gap set on the container element
 */
export const columnSpan = (columns, gridColumns, gridGap) => {
  // Convert columns value to grid-column value.
  const gridColumnSpan = 'auto' === columns ? 'auto' : columns.join(' / ');

  // Calculate flexbox column width based on grid columns.
  let flexboxWidth = 0;
  if ('auto' === columns) {
    flexboxWidth = (1 / gridColumns) * 100;
  }

  if (Array.isArray(columns)) {
    const flexColumns = columns.slice().reverse();
    flexboxWidth = Math.abs(
      (flexColumns.reduce((acc, curr) => acc - curr) / gridColumns) * 100
    );
  }

  // Calculate flexbox padding based on grid gap.
  let flexboxPadding = 0;
  if ('number' === typeof gridGap) {
    flexboxPadding = rem(gridGap / 2);
  }

  if (Array.isArray(gridGap)) {
    flexboxPadding = rem((gridGap[0]) / 2);
  }

  return (css`
    flex: 1 0 ${flexboxWidth}%;
    padding-bottom: ${'auto' === columns ? rem(gridGap) : 0};
    padding-left: ${flexboxPadding};
    padding-right: ${flexboxPadding};
    max-width: ${flexboxWidth}%;

    @supports (display: grid) {
      grid-column: ${gridColumnSpan};
      padding-bottom: 0;
      padding-left: 0;
      padding-right: 0;
      max-width: none;
    }
  `);
};

/**
 * A mixin for generating CSS grid span styles.
 * @param {array|string} rows the grid-row start and end values,
 * per CSS Grid spec, ie. [1, 4]
 */
export const rowSpan = (rows) => css`
  grid-row: ${'auto' === rows ? 'auto' : rows.join(' / ')};
`;
