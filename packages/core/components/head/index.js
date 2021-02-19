import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const Head = (props) => {
  const { children } = props;
  const validTypes = [
    'title',
    'base',
    'meta',
    'link',
    'script',
    'noscript',
    'style',
    'body',
    'html',
  ];
  const otherChildren = children.filter(
    ({ type }) => ! validTypes.includes(type)
  );
  const helmetChildren = children
    .filter(({ type }) => validTypes.includes(type))
    .map((child) => {
      const { type, props: childProps } = child;
      const {
        children: tagContent,
        config,
      } = childProps;

      if (
        ('script' === type || 'style' === type) &&
        Array.isArray(tagContent) &&
        tagContent.length
      ) {
        // <Helmet> requires the `children` prop for `style` and `script`
        // elements to be a string. As such, we reduce the array to a
        // single string using join().
        return React.cloneElement(
          child,
          config,
          tagContent.join('')
        );
      }

      return child;
    });

  return (
    <>
      <Helmet>
        {helmetChildren}
      </Helmet>
      {otherChildren}
    </>
  );
};

Head.defaultProps = {
  children: {},
};

Head.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
};

export default Head;
