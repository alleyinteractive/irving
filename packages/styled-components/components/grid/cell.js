import React from 'react';
import PropTypes from 'prop-types';
import { breakpoints } from '../../variables';
import StyledCell from './cellStyles';

const { breakpointNames } = breakpoints;

const GridCell = (props) => {
  const {
    children,
    className,
    tag,
  } = props;

  return (
    <StyledCell
      className={className}
      as={tag}
      {...props}
    >
      {children}
    </StyledCell>
  );
};

GridCell.defaultProps = {
  columns: 'auto',
  className: '',
  responsiveStyles: [],
  rows: [],
  tag: 'div',
};

GridCell.propTypes = {
  /**
   * Children of this component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The column span values, which are mapped to the `grid-column` rule.
   * Example: `[1, 7]` becomes `grid-column: 1 / 7`. Also accepts and defaults
   * to the `auto` keyword. Note: The CSS grid spec accepts other values as well,
   * i.e. `grid-column: 1 / span 2`, `grid-column: auto`, etc., but for now we're
   * only doing `auto` or column numbers so that we can programatically create
   * the flexbvox fallbacks for IE.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   */
  columns: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.oneOf(['auto']),
  ]),
  /**
   * className, requried by styled components to pass additional styles when doing
   * things like `const Inner = styled(Container`).
   */
  className: PropTypes.string,
  /**
   * The HTML element to use for the grid cell.
   * @todo: revisit/update to ensure we're including a sensible list of elements.
   */
  tag: PropTypes.oneOf([
    'a',
    'aside',
    'button',
    'div',
    'li',
    'span',
  ]),
  /**
   * The total number of columns on the grid container, used to calculate
   * column widths for the flexbox fallback styles. This value is passed as a prop
   * from the GridContainer component.
   */
  gridColumns: PropTypes.number.isRequired,
  /**
   * The grid-gap set on the container, used to calclulate
   * column padding for the flexbox fallback styles. This value is passed as a prop
   * from the GridContainer component.
   */
  gridGap: PropTypes.number.isRequired,
  /**
   * responsive styles: An array of objects, which define a breakpoint and the CSS grid styles that
   * should apply at that breakpoint.
   */
  responsiveStyles: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The breakpoint name, from the breakpoints config.
     */
    breakpoint: PropTypes.oneOf(breakpointNames),
    /**
     * See columns prop comments for details.
     */
    columns: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.oneOf(['auto']),
    ]),
    /**
     * See the rows prop for details.
     */
    rows: PropTypes.arrayOf(PropTypes.array),
  })),
  /**
   * The row span values, which are mapped to the `grid-row` rule. Works the same
   * way as the columns prop with regard to `auto` keyword vs array of 2 numbers.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
   */
  rows: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
};

export default GridCell;
