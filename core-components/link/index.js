import React from 'react';
import PropTypes from 'prop-types';
import parseUrl from 'utils/getRelativeUrl';
import history from 'utils/history';

const Link = (props) => {
  const relativeUrl = parseUrl(props.to);
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
