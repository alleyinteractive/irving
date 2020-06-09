import React from 'react';
import PropTypes from 'prop-types';
import withThemes from 'components/hoc/withThemes';
import * as defaultStyles from './themes/default';

/**
 * Render children in a React fragment or any other HTML tag.
 */
const Fragment = (props) => {
  const {
    children,
    tag,
    theme,
  } = props;

  const { Element } = theme;

  return (
    <>
      {tag ? (
        <Element as={tag}>{children}</Element>
      ) : (
        children
      )}
    </>
  );
};

Fragment.defaultProps = {
  children: {},
  tag: null,
};

Fragment.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
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
