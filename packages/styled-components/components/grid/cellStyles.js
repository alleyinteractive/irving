import styled, { css } from 'styled-components';
import { breakpoints } from '../../variables';
import {
  columnSpan,
  rowSpan,
} from '../../utils/cssGrid';

const createBreakpointStyles = (responsiveStyles, gridColumns) => (
  responsiveStyles.map((style) => (css`
    @media (${breakpoints[style.breakpoint]}) {
      ${(style.columns) && columnSpan(style.columns, gridColumns)};
      ${(style.rows) && rowSpan(style.rows)}
    }
  `))
);

const StyledCell = styled.div`
  ${(props) => (
    props.columns ?
      columnSpan(props.columns, props.gridColumns, props.gridGap) : ''
  )}

  ${(props) => (props.rows ? rowSpan(props.rows) : '')};

  ${(props) => {
    const { responsiveStyles, gridColumns, gridGap } = props;
    return createBreakpointStyles(responsiveStyles, gridColumns, gridGap);
  }}
`;

export default StyledCell;
