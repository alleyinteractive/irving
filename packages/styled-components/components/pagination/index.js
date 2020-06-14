import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import Link from 'components/link';
import * as defaultStyles from './themes/default';

const buildUrl = (props, page) => {
  const {
    baseUrl,
    paginationFormat,
  } = props;

  const paginationPart = paginationFormat.replace('%1$d', page);

  return `${baseUrl}${paginationPart}?s=post`;
};

/**
 * Pagination.
 *
 * Pagination UI.
 *
 * @todo Setup I18N.
 */
const Pagination = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    baseUrl,
    currentPage,
    // eslint-disable-next-line no-unused-vars
    displayFirstAndLast,
    displayPrevAndNext,
    // eslint-disable-next-line no-unused-vars
    paginationFormat,
    range,
    style,
    theme = defaultStyles,
    totalPages,
  } = props;

  const {
    PaginationWrapper,
    NavWrapper,
    CurrentPageNavWrapper,
    EllipsesNavWrapper,
    NextAndPrevNavWrapper,
    NoResults,
  } = theme;

  const pages = [];

  /**
   * Display the `Prev` button to navigate back a single page.
   */
  if (displayPrevAndNext && 1 < currentPage) {
    pages.push(
      <NextAndPrevNavWrapper as={Link} href={buildUrl(props, currentPage - 1)}>
        Prev
      </NextAndPrevNavWrapper>
    );
  }

  /**
   * Do some math to determine the start and end range of navigation buttons.
   */
  const newRange = Math.floor(range / 2);
  const startRange = (1 > (currentPage - newRange)) ?
    1 :
    (currentPage - newRange);
  const endRange = (totalPages < (currentPage + newRange)) ?
    totalPages :
    (currentPage + newRange);

  /**
   * Display a link for the first page, followed by an ellipses indicating a
   * skip in nav ui.
   */
  if (2 < startRange) {
    pages.push(
      <NavWrapper as={Link} href={buildUrl(props, 1)}>
        First
      </NavWrapper>
    );
    pages.push(<EllipsesNavWrapper>...</EllipsesNavWrapper>);
  }

  /**
   * Render a handful of pagination buttons around the current page.
   */
  // eslint-disable-next-line no-plusplus
  for (let i = startRange; i <= endRange; i ++) {
    if (i === currentPage) {
      pages.push(<CurrentPageNavWrapper>{i}</CurrentPageNavWrapper>);
    } else {
      pages.push(
        <NavWrapper as={Link} href={buildUrl(props, i)}>
          {i}
        </NavWrapper>
      );
    }
  }

  /**
   * Display a link for the next page, followed by an ellipses indicating a
   * skip in the nav ui.
   */
  if (endRange < (totalPages - 1)) {
    pages.push(<EllipsesNavWrapper>...</EllipsesNavWrapper>);
    pages.push(
      <NavWrapper as={Link} href={buildUrl(props, totalPages)}>
        Last
      </NavWrapper>
    );
  }

  /**
   * Display the `Next` button to navigate back a single page.
   */
  if (displayPrevAndNext && totalPages > currentPage) {
    pages.push(
      <NextAndPrevNavWrapper as={Link} href={buildUrl(props, currentPage + 1)}>
        Next
      </NextAndPrevNavWrapper>
    );
  }

  // Don't display if there aren't any pages.
  if (1 === totalPages) {
    return (
      <NoResults />
    );
  }

  return (
    <PaginationWrapper style={style}>
      {pages}
    </PaginationWrapper>
  );
};

Pagination.defaultProps = {
  baseUrl: '/',
  currentPage: 1,
  displayFirstAndLast: true,
  displayPrevAndNext: true,
  paginationFormat: '/page/%1$d/',
  range: 5,
  style: {},
  theme: defaultStyles,
  totalPages: 1,
};

Pagination.propTypes = {
  /**
   * [baseUrl description]
   */
  baseUrl: PropTypes.string,
  /**
   * The current page.
   */
  currentPage: PropTypes.number,
  /**
   * Display UI for the first and last pages.
   */
  displayFirstAndLast: PropTypes.bool,
  /**
   * Display UI for the previous and next pages.
   */
  displayPrevAndNext: PropTypes.bool,
  /**
   * Url part that defines the page.
   */
  paginationFormat: PropTypes.string,
  /**
   * How many pages to display around the current page.
   */
  range: PropTypes.number,
  /**
   * CSS styles.
   */
  style: PropTypes.object,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
  /**
   * The total number of pages.
   */
  totalPages: PropTypes.number,
};

const themeMap = {
  default: defaultStyles,
};

export default withThemes(themeMap)(Pagination);
