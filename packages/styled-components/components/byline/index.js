import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
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
    style,
    theme,
  } = props;

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
        <BylineWrapper style={style}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span>{preText}</span>}
            <AuthorWrapper>{children}</AuthorWrapper>
          </AuthorsWrapper>
        </BylineWrapper>
      );

    case (2 === children.length):
      return (
        <BylineWrapper style={style}>
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
        <BylineWrapper style={style}>
          <AuthorsWrapper data-testid="authors-wrapper">
            {preText && <span>{preText}</span>}
            {children.map((child, index) => {
              // First through second to last author.
              if (index < (children.length - 2)) {
                return (
                  <>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    {multiDelimiter}
                  </>
                );
              }

              // Second to last author.
              if (index < (children.length - 1)) {
                return (
                  <>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    {lastDelimiter}
                  </>
                );
              }

              // Last author.
              return (
                <AuthorWrapper>{child}</AuthorWrapper>
              );
            })}
          </AuthorsWrapper>
        </BylineWrapper>
      );
  }
};

Byline.defaultProps = {
  children: [],
  lastDelimiter: ', and ',
  multiDelimiter: ', ',
  preText: 'By ',
  singleDelimiter: ' and ',
  style: {},
  theme: defaultStyles,
};

Byline.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
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
};

export const themeMap = {
  default: defaultStyles,
};

export { Byline as PureComponent };

export const StyledComponent = withThemes(themeMap)(Byline);

export default StyledComponent;
