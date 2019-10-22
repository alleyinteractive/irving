import React from 'react';
import PropTypes from 'prop-types';
import { breakpoints, layout } from '../../variables';
import StyledContainer from './containerStyles';

const { breakpointNames } = breakpoints;

const GridContainer = (props) => {
  const {
    children,
    className,
    columns,
    gap,
    tag,
  } = props;

  return (
    <StyledContainer
      className={className}
      as={tag}
      {...props}
    >
      {/* eslint-disable react/no-array-index-key */}
      {children.map((child, index) => (
        React.cloneElement(child, {
          key: index,
          gridColumns: columns,
          gridGap: gap,
        })
      ))}
      {/* eslint-enable */}
    </StyledContainer>
  );
};

GridContainer.defaultProps = {
  columns: layout.gridColumns,
  className: '',
  gap: layout.gridGap,
  maxWidth: 'xlVal',
  responsiveStyles: [],
  rows: null,
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
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The value to use for CSS `grid-gap`. Accepts the following types:
   * - A single number: outputs the a single value, used for both column-gap
   * and row-gap. Uses the rem() function.
   * - An array of 2 numbers: outputs 2 values, one for column-gap and
   * one for row-gap. Uses the rem() function.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
   */
  gap: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  /**
   * The max-width of the container, must be a defined breakpoint,
   * should be a value, not Min/Max, e.g. `xlVal`, not `xlMin` or `xlMax`.
   */
  maxWidth: PropTypes.oneOf(breakpointNames),
  /**
   * An array of objects, which define a breakpoint and the CSS grid styles that
   * should apply at that breakpoint.
   */
  responsiveStyles: PropTypes.arrayOf(PropTypes.shape({
    breakpoint: PropTypes.oneOf(breakpointNames),
    columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gap: PropTypes.oneOfType([
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
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The type of HTML element to use for the grid container.
   */
  tag: PropTypes.oneOf([
    'div',
    'footer',
    'header',
    'main',
    'nav',
    'section',
    'ul',
    'nav',
  ]),
};

export default GridContainer;
