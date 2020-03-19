import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { breakpointNames } from '../../variables/breakpoints';
import { GridContext } from './gridProvider';
import StyledContainer from './containerStyles';

const GridContainer = (props) => {
  const {
    gridColumns: contextColumns,
    gridRows: contextRows,
    gridGap: contextGap,
  } = useContext(GridContext);
  const {
    children,
    className,
    gridColumns,
    gridRows,
    gridGap,
    padding,
    responsiveStyles,
    maxWidth,
    tag,
  } = props;
  const useProps = !! (gridColumns || gridGap);

  return (
    <StyledContainer
      className={className}
      as={tag}
      gridColumns={gridColumns || contextColumns}
      gridRows={gridRows || contextRows}
      gridGap={gridGap || contextGap}
      padding={padding}
      responsiveStyles={responsiveStyles}
      maxWidth={maxWidth}
    >
      {useProps ? (
        <GridContext.Provider
          value={{
            gridColumns: gridColumns || contextColumns,
            gridRows: gridRows || contextRows,
            gridGap: gridGap || contextGap,
          }}
        >
          {children}
        </GridContext.Provider>
      ) : children}
    </StyledContainer>
  );
};

GridContainer.defaultProps = {
  gridColumns: 0,
  className: '',
  gridGap: 0,
  maxWidth: 'xlVal',
  padding: 0,
  responsiveStyles: [],
  gridRows: null,
  tag: 'div',
};

GridContainer.propTypes = {
  /**
   * Children of this component.
   */
  children: PropTypes.node.isRequired,
  /**
   * className, required by styled components to pass additional styles when doing
   * things like `const Inner = styled(Container`).
   */
  className: PropTypes.string,
  /**
   * The number of CSS Grid columns for equal width columns, or a string for
   * custom columns.
   * Outputs value for `grid-column`.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   */
  gridColumns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
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
  ]),
  /**
   * The max-width of the container, must be a defined breakpoint,
   * should be a value, not Min/Max, e.g. `xlVal`, not `xlMin` or `xlMax`.
   */
  maxWidth: PropTypes.oneOf(breakpointNames),
  /**
   * Outer padding for the grid container.
   */
  padding: PropTypes.number,
  /**
   * An array of objects, which define a breakpoint and the CSS grid styles that
   * should apply at that breakpoint.
   */
  responsiveStyles: PropTypes.arrayOf(PropTypes.shape({
    breakpoint: PropTypes.oneOf(breakpointNames),
    gridColumns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gridRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gridGap: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
  })),
  /**
   * The number of CSS Grid rows for equal height rows, or a string for
   * custom rows.
   * Outputs value for `grid-row`.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
   */
  gridRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The type of HTML element to use for the grid container.
   */
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default GridContainer;
