import styled, { css } from 'styled-components';
import { breakpoints } from 'styles/variables';
import {
  columnSpan,
  rowSpan,
} from 'styles/utils/cssGrid';

const createBreakpointStyles = (responsiveStyles, gridColumns) => (
  responsiveStyles.map((style) => (css`
    @media (${breakpoints[style.breakpoint]}) {
      ${(style.columns) && columnSpan(style.columns, gridColumns)};
      ${(style.rows) && rowSpan(style.rows)}
    }
  `))
);

const StyledCell = styled.div`
  ${(props) => {
    const {
      gridColumns,
      columns,
      gridGap,
    } = props;

    return columns ? columnSpan(columns, gridColumns, gridGap) : '';
  }}

  ${({ rows }) => (rows ? rowSpan(rows) : '')};

  ${(props) => {
    const { responsiveStyles, gridColumns, gridGap } = props;
    return createBreakpointStyles(responsiveStyles, gridColumns, gridGap);
  }}
`;

export default StyledCell;
