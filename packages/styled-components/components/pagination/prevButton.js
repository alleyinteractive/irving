import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/link';
import buildUrl from './';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';

/**
 * PrevButton for Pagination UI.
 */
const PrevButton = (props) => {
  const {
    currentPage,
    displayPrevAndNext,
    theme,
  } = props;

  const {
    NavWrapper,
  } = theme;

  if (! displayPrevAndNext) {
    return null;
  }

  if (1 === currentPage) {
    return null;
  }

  return (
    <NavWrapper as={Link} href={buildUrl(props, currentPage - 1)}>
      Prev
    </NavWrapper>
  );
};

PrevButton.defaultProps = {
  currentPage: 1,
  displayPrevAndNext: true,
};

PrevButton.propTypes = {
  /**
   * The current page.
   */
  currentPage: PropTypes.number,
  /**
   * Display UI for the previous and next pages.
   */
  displayPrevAndNext: PropTypes.bool,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object.isRequired,
};

const themeMap = {
  default: defaultStyles,
};

export default withThemes(themeMap)(PrevButton);
