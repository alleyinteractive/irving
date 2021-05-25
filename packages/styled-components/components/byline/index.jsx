import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
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
  const standardProps = useStandardProps(props);

  const {
    BylineWrapper,
    AuthorsWrapper,
    AuthorWrapper,
  } = theme;

  // Modify the output depending on the number of authors. This allows us to
  // change the delimiter(s) accordingly.
  switch (true) {
    default:
    case (children.length === 0):
      return false;

    case (children.length === 1):
      return (
        <BylineWrapper {...standardProps}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span className="byline__pretext">{preText}</span>}
            <AuthorWrapper>{children}</AuthorWrapper>
          </AuthorsWrapper>
        </BylineWrapper>
      );

    case (children.length === 2):
      return (
        <BylineWrapper {...standardProps}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span className="byline__pretext">{preText}</span>}
            <AuthorWrapper>{children[0]}</AuthorWrapper>
            <span className="byline__single-delimiter">{singleDelimiter}</span>
            <AuthorWrapper>{children[1]}</AuthorWrapper>
          </AuthorsWrapper>
        </BylineWrapper>
      );

    case (children.length >= 3):
      return (
        <BylineWrapper {...standardProps}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span className="byline__pretext">{preText}</span>}
            {children.map((child, index) => {
              const key = index;
              // First through second to last author.
              if (index < (children.length - 2)) {
                return (
                  <Fragment key={key}>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    <span className="byline__multi-delimiter">
                      {multiDelimiter}
                    </span>
                  </Fragment>
                );
              }

              // Second to last author.
              if (index < (children.length - 1)) {
                return (
                  <Fragment key={key}>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    <span className="byline__last-delimiter">
                      {lastDelimiter}
                    </span>
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
  ...getStandardDefaultProps(),
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
