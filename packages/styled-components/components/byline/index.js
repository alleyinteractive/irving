import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import getStandardProps from '@irvingjs/styled/utils/getStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

/**
 * Byline.
 *
 * Display a list of content authors.
 */
const Byline = (props) => {
  const {
    children,
    lastDelimiter,
    multiDelimiter,
    preText,
    singleDelimiter,
    theme,
  } = props;
  const standardProps = getStandardProps(props);

  const {
    BylineWrapper,
    AuthorsWrapper,
    AuthorWrapper,
  } = theme;

  // Modify the output depending on the number of authors. This allows us to
  // change the delimiter(s) accordingly.
  switch (true) {
    default:
    case (0 === children.length):
      return false;

    case (1 === children.length):
      return (
        <BylineWrapper {...standardProps}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span>{preText}</span>}
            <AuthorWrapper>{children}</AuthorWrapper>
          </AuthorsWrapper>
        </BylineWrapper>
      );

    case (2 === children.length):
      return (
        <BylineWrapper {...standardProps}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span>{preText}</span>}
            <span>
              <AuthorWrapper>{children[0]}</AuthorWrapper>
              {singleDelimiter}
              <AuthorWrapper>{children[1]}</AuthorWrapper>
            </span>
          </AuthorsWrapper>
        </BylineWrapper>
      );

    case (3 <= children.length):
      return (
        <BylineWrapper {...standardProps}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span>{preText}</span>}
            {children.map((child, index) => {
              const key = index;
              // First through second to last author.
              if (index < (children.length - 2)) {
                return (
                  <Fragment key={key}>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    {multiDelimiter}
                  </Fragment>
                );
              }

              // Second to last author.
              if (index < (children.length - 1)) {
                return (
                  <Fragment key={key}>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    {lastDelimiter}
                  </Fragment>
                );
              }

              // Last author.
              return (
                <AuthorWrapper key={key}>{child}</AuthorWrapper>
              );
            })}
          </AuthorsWrapper>
        </BylineWrapper>
      );
  }
};

Byline.defaultProps = {
  ...standardDefaultProps,
  theme: defaultStyles,
  lastDelimiter: ', and ',
  multiDelimiter: ', ',
  preText: 'By ',
  singleDelimiter: ' and ',
};

Byline.propTypes = {
  ...standardPropTypes,
  /**
   * Last delimiter.
   */
  lastDelimiter: PropTypes.string,
  /**
   * Multi delimiter.
   */
  multiDelimiter: PropTypes.string,
  /**
   * Pre text.
   */
  preText: PropTypes.string,
  /**
   * Single delimiter.
   */
  singleDelimiter: PropTypes.string,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Byline as Component,
  themeMap,
};

export default Byline;
