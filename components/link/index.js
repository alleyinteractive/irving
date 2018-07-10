/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import parseUrl from 'utils/getRelativeUrl';
import history from 'utils/history';
import isNode from 'utils/isNode';

const Link = (props) => {
  const relativeUrl = parseUrl(props.to);
  if (! isNode()) {
    throw new Error('foo');
  }
  return (
    <a
      {...props}
      href={props.to}
      onClick={(event) => {
        if (relativeUrl) {
          event.preventDefault();
          history.push(relativeUrl);
        }
      }}
    >
      {props.children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
