import React from 'react';
import { decode } from 'he';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';

/**
 * Byline.
 *
 * Display a byline and timestamp.
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
        <BylineWrapper style={style}>
          <TimestampWrapper>{timestamp}</TimestampWrapper>
        </BylineWrapper>
      );

    case 1:
      return (
        <BylineWrapper style={style}>
          <AuthorsWrapper>
            {preText && <span>{decode(preText)}</span>}
            <AuthorWrapper>{children}</AuthorWrapper>
          </AuthorsWrapper>
          <TimestampWrapper>{timestamp}</TimestampWrapper>
        </BylineWrapper>
      );

    case 2:
      return (
        <BylineWrapper style={style}>
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
        <BylineWrapper style={style}>
          <AuthorsWrapper>
            {preText && <span>{decode(preText)}</span>}
            {children.map((child, index) => {
              // First through second to last author.
              if (index < (children.length - 2)) {
                return (
                  <>
                    <AuthorWrapper key={index}>{child}</AuthorWrapper>
                    {decode(multiDelimiter)}
                  </>
                );
              }

              // Second to last author.
              if (index < (children.length - 1)) {
                return (
                  <>
                    <AuthorWrapper key={index}>{child}</AuthorWrapper>
                    {decode(lastDelimiter)}
                  </>
                );
              }

              // Last author.
              return (
                <AuthorWrapper key={index}>
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
  children: [],
  lastDelimiter: ', and',
  multiDelimiter: ', ',
  preText: 'By&nbsp;',
  singleDelimiter: ' and ',
  style: {},
  theme: defaultStyles,
  timestamp: '',
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
  style: PropTypes.object,
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

export { Byline as PureByline };

export default withThemes(menuThemeMap)(Byline);
