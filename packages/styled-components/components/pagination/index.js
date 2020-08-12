/* eslint max-len: 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
import Link from 'components/link';
import * as defaultStyles from './themes/default';

/**
 * Using the same props from a Pagination component, build the url for a given
 * page.
 *
 * @todo Refactor so only necessary props are passed.
 *
 * @param {object}  props Pagination component props.
 * @param {integer} page  Page for the url.
 * @return {string}
 */
const buildUrl = (props, page) => {
  const {
    baseUrl,
    paginationFormat,
  } = props;

  const paginationPart = paginationFormat.replace('%1$d', page);
  const currentQueryVars = queryString.parse(window.location.search);

  if (1 === page) {
    return `${baseUrl}?${queryString.stringify(currentQueryVars)}`;
  }

  return `${baseUrl}${paginationPart}?${queryString.stringify(currentQueryVars)}`;
};

/**
 * Pagination.
 *
 * Pagination UI.
 *
 * @todo Setup I18N.
 * @todo Write tests.
 * @todo Update to use a custom hook.
 */
const Pagination = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    baseUrl,
    currentPage,
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

  // Don't display if there aren't any pages.
  if (1 === totalPages) {
    return (
      <NoResults />
    );
  }

  const pages = [];

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
   * Render a handful of pagination buttons around the current page.
   */
  // eslint-disable-next-line no-plusplus
  for (let i = startRange; i <= endRange; i ++) {
    if (i === currentPage) {
      pages.push(<CurrentPageNavWrapper className="irving-pagination-current-page">{i}</CurrentPageNavWrapper>);
    } else {
      pages.push(<NavWrapper as={Link} href={buildUrl(props, i)}>{i}</NavWrapper>);
    }
  }

  /**
   * Display the first and last pagination buttons.
   *
   * If the range is close enough, we'll just render the actual pagination
   * elements instead.
   *
   * This logic only applies when `displayFirstAndLast` is true, otherwise we respect
   * the range value in the logic above.
   */
  if (displayFirstAndLast) {
    switch (true) {
      default:
      case (1 === startRange):
        break;

      case (2 === startRange):
        pages.unshift(<NavWrapper as={Link} href={buildUrl(props, 1)}>1</NavWrapper>);
        break;

      case (3 === startRange):
        pages.unshift(<NavWrapper as={Link} href={buildUrl(props, 2)}>2</NavWrapper>);
        pages.unshift(<NavWrapper as={Link} href={buildUrl(props, 1)}>1</NavWrapper>);
        break;

      case (4 <= startRange):
        pages.unshift(<EllipsesNavWrapper>...</EllipsesNavWrapper>);
        pages.unshift(<NavWrapper as={Link} href={buildUrl(props, 1)}>1</NavWrapper>);
        break;
    }

    switch (true) {
      default:
      case ((totalPages) === endRange):
        break;

      case ((totalPages - 1) === endRange):
        pages.push(<NavWrapper as={Link} href={buildUrl(props, totalPages)}>{totalPages}</NavWrapper>);
        break;

      case ((totalPages - 2) === endRange):
        pages.push(<NavWrapper as={Link} href={buildUrl(props, totalPages - 1)}>{totalPages - 1}</NavWrapper>);
        pages.push(<NavWrapper as={Link} href={buildUrl(props, totalPages)}>{totalPages}</NavWrapper>);
        break;

      case ((totalPages - 3) >= endRange):
        pages.push(<EllipsesNavWrapper>...</EllipsesNavWrapper>);
        pages.push(<NavWrapper as={Link} href={buildUrl(props, totalPages)}>{totalPages}</NavWrapper>);
        break;
    }
  }

  /**
   * Display `Prev` and `Next` buttons.
   */
  if (displayPrevAndNext) {
    if (1 < currentPage) {
      pages.unshift(
        <NextAndPrevNavWrapper
          as={Link}
          href={buildUrl(props, currentPage - 1)}
        >
          Prev
        </NextAndPrevNavWrapper>
      );
    }

    if (totalPages > currentPage) {
      pages.push(
        <NextAndPrevNavWrapper
          as={Link}
          href={buildUrl(props, currentPage + 1)}
        >
          Next
        </NextAndPrevNavWrapper>
      );
    }
  }

  return (
    <PaginationWrapper style={style}>
      {pages.map((page, index) => (
        cloneElement(
          page,
          {
            key: `${page.props.href}-${index}`,
            ...page.props,
          }
        )
      ))}
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
   * Base url. Usually the url of the first page of results.
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
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
  /**
   * The total number of pages.
   */
  totalPages: PropTypes.number,
};

export const themeMap = {
  default: defaultStyles,
};

export { Pagination as PureComponent };

export const StyledComponent = withThemes(themeMap)(Pagination);

export default StyledComponent;
