import React from 'react';
import { decode } from 'he';
import PropTypes from 'prop-types';
import withThemes from 'components/hoc/withThemes';
import * as defaultStyles from './themes/default';

/**
 * Post byline.
 *
 * Get the post byline.
 */
const Byline = (props) => {
  const {
    children,
    lastDelimiter,
    multiDelimiter,
    preText,
    singleDelimiter,
    theme,
    timestamp,
  } = props;

  const {
    BylineWrapper,
    AuthorsWrapper,
    AuthorWrapper,
    TimestampWrapper,
  } = theme;

  // Modify the output depending on the number of authors. This allows us to
  // change the delimiter(s) accordingly.
  switch (children.length) {
    default:
    case 0:
      return (
        <BylineWrapper>
          <TimestampWrapper>{timestamp}</TimestampWrapper>
        </BylineWrapper>
      );

    case 1:
      return (
        <BylineWrapper>
          <AuthorsWrapper>
            {preText && <span>{decode(preText)}</span>}
            <AuthorWrapper>{children}</AuthorWrapper>
          </AuthorsWrapper>
          <TimestampWrapper>{timestamp}</TimestampWrapper>
        </BylineWrapper>
      );

    case 2:
      return (
        <BylineWrapper>
          <AuthorsWrapper>
            {preText && <span>{decode(preText)}</span>}
            <span>
              <AuthorWrapper>{children[0]}</AuthorWrapper>
              {singleDelimiter}
              <AuthorWrapper>{children[1]}</AuthorWrapper>
            </span>
          </AuthorsWrapper>
          <TimestampWrapper>{timestamp}</TimestampWrapper>
        </BylineWrapper>
      );

    case (2 < children.length):
      return (
        <BylineWrapper>
          <AuthorsWrapper>
            {preText && <span>{decode(preText)}</span>}
            {children.map((child, index) => {
              // First through second to last author.
              if (index < (children.length - 2)) {
                return (
                  <>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    {decode(multiDelimiter)}
                  </>
                );
              }

              // Second to last author.
              if (index < (children.length - 1)) {
                return (
                  <>
                    <AuthorWrapper>{child}</AuthorWrapper>
                    {decode(lastDelimiter)}
                  </>
                );
              }

              // Last author.
              return (
                <AuthorWrapper>
                  {child}
                </AuthorWrapper>
              );
            })}
          </AuthorsWrapper>
          <TimestampWrapper>{timestamp}</TimestampWrapper>
        </BylineWrapper>
      );
  }
};

Byline.defaultProps = {
  lastDelimiter: ', and',
  multiDelimiter: ', ',
  preText: 'By ',
  singleDelimiter: ' and ',
  theme: defaultStyles,
  timestamp: '',
};

Byline.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node.isRequired,
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
   * Timestamp.
   */
  timestamp: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

const menuThemeMap = {
  default: defaultStyles,
};

export default withThemes(menuThemeMap)(Byline);
