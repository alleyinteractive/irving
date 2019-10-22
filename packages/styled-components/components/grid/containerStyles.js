import styled, { css } from 'styled-components';
import { breakpoints } from '../../variables';
import {
  display,
  columnsEqual,
  columnsCustom,
  rowsEqual,
  rowsCustom,
} from '../../utils/cssGrid';

const createGridStyles = (columns, rows, gap) => css`
  ${display}
  ${'number' === typeof columns ?
    columnsEqual(columns, gap) :
    columnsCustom(columns, gap)}

  ${'number' === typeof rows && rowsEqual(rows)}
  ${'string' === typeof rows && rowsCustom(rows)}
`;

const createBreakpointStyles = (responsiveStyles, gap) => (
  responsiveStyles.map((style) => (css`
  @media (${breakpoints[style.breakpoint]}) {
    ${'number' === typeof style.columns ?
      columnsEqual(style.columns, style.gap || gap) :
      columnsCustom(style.columns, style.gap || gap)}

    ${'number' === typeof style.rows && rowsEqual(style.rows)}
    ${'string' === typeof style.rows && rowsCustom(style.rows)}
  }
`))
);

const StyledContainer = styled.div`
  display: block;
  margin: 0 auto;
  max-width: ${(props) => breakpoints[props.maxWidth]};

  /* Create grid styles */
  ${(props) => {
    const { columns, rows, gap } = props;
    return createGridStyles(columns, rows, gap);
  }}

  /* Create responsive styles */
  ${(props) => {
    const {
      responsiveStyles,
      gap,
    } = props;

    if (responsiveStyles.length && responsiveStyles) {
      return createBreakpointStyles(
        responsiveStyles,
        gap
      );
    }

    return '';
  }}
`;

export default StyledContainer;
