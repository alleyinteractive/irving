import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { layout } from '../../variables';

export const GridContext = createContext({
  gridGap: layout.gridGap,
  gridColumns: layout.gridColumns,
  gridRows: layout.gridRows,
});

const GridProvider = (props) => {
  const {
    gridGap,
    gridColumns,
    gridRows,
    children,
  } = props;

  return (
    <GridContext.Provider
      value={{
        gridGap,
        gridColumns,
        gridRows,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

GridProvider.defaultProps = {
  gridRows: null,
};

GridProvider.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * The number of CSS Grid columns for equal width columns, or a string for
   * custom columns.
   * Outputs value for `grid-column`.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   */
  gridColumns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  /**
   * The value to use for CSS `grid-gap`. Accepts the following types:
   * - A single number: outputs the a single value, used for both column-gap
   * and row-gap. Uses the rem() function.
   * - An array of 2 numbers: outputs 2 values, one for column-gap and
   * one for row-gap. Uses the rem() function.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
   */
  gridGap: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  /**
   * The number of CSS Grid rows for equal height rows, or a string for
   * custom rows.
   * Outputs value for `grid-row`.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
   */
  gridRows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default GridProvider;
