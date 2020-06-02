import React from 'react';
import PropTypes from 'prop-types';
import Link from 'component-candidates/common/link';

/**
 * Post permalink.
 *
 * Wraps elements in the post's URL.
 */
const Permalink = (props) => {
  const {
    children,
    url,
  } = props;

  return (
    <Link href={url}>
      {children}
    </Link>
  );
};

Permalink.defaultProps = {
  url: '',
};

Permalink.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * URL.
   */
  url: PropTypes.string,
};

export default Permalink;
