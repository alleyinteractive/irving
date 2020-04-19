import styled, { css } from 'styled-components';
import { rem } from '../../utils';
import {
  display,
  columnsEqual,
  columnsCustom,
  rowsEqual,
  rowsCustom,
} from '../../utils/cssGrid';
import { breakpoints } from '../../variables';

const createGridStyles = (columns, rows, gap) => css`
  ${display}
  padding: ${(props) => rem(props.padding)};
  ${'number' === typeof columns ?
    columnsEqual(columns, gap) :
    columnsCustom(columns, gap)}

  ${'number' === typeof rows && rowsEqual(rows)}
  ${'string' === typeof rows && rowsCustom(rows)}
`;

const createBreakpointStyles = (responsiveStyles, gap) => (
  responsiveStyles.map((style) => (css`
  @media (${breakpoints[style.breakpoint]}) {
    ${'number' === typeof style.gridColumns ?
      columnsEqual(style.gridColumns, style.gap || gap) :
      columnsCustom(style.gridColumns, style.gap || gap)}

    ${'number' === typeof style.rows && rowsEqual(style.rows)}
    ${'string' === typeof style.rows && rowsCustom(style.rows)}
  }
`))
);

const StyledContainer = styled.div`
  display: block;

  /* Create grid styles */
  ${(props) => {
    const {
      gridColumns,
      gridRows,
      gridGap,
    } = props;
    return createGridStyles(
      gridColumns,
      gridRows,
      gridGap
    );
  }}

  /* Create responsive styles */
  ${(props) => {
    const {
      responsiveStyles,
      gridGap,
    } = props;

    if (responsiveStyles.length && responsiveStyles) {
      return createBreakpointStyles(
        responsiveStyles,
        gridGap
      );
    }

    return '';
  }}
`;

export default StyledContainer;
