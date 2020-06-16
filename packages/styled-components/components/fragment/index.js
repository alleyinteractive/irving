import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/withThemes';
import * as defaultStyles from './themes/default';

/**
 * Render children in a React fragment or any other HTML tag.
 */
const Fragment = (props) => {
  const {
    children,
    style,
    theme,
  } = props;

  let {
    tag,
  } = props;

  const { Element } = theme;

  // If we have something in `style` and element is empty, require a tag.
  if (null === tag && Object.keys(style).length && ! style.length) {
    tag = 'span';
  }

  return (
    <>
      {tag ? (
        <Element as={tag} style={style}>{children}</Element>
      ) : (
        children
      )}
    </>
  );
};

Fragment.defaultProps = {
  children: {},
  style: {},
  tag: null,
};

Fragment.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
  /**
   * CSS styles.
   */
  style: PropTypes.object,
  /**
   * Tag used to render.
   */
  tag: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object.isRequired,
};

const themeMap = {
  default: defaultStyles,
};

export default withThemes(themeMap)(Fragment);
