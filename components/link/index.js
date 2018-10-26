import React from 'react';
import PropTypes from 'prop-types';
import parseUrl from 'utils/getRelativeUrl';
import history from 'utils/history';
import omit from 'lodash/fp/omit';

const Link = (props) => {
  const { to, blank, onClick } = props;
  const relativeUrl = parseUrl(to);
  const defaultOnClick = (event) => {
    if (relativeUrl) {
      event.preventDefault();
      history.push(relativeUrl);
    }
  };

  return (
    <a
      {...omit(['blank'], props)}
      href={to}
      onClick={onClick || defaultOnClick}
      target={blank ? '_blank' : null}
      rel={blank ? 'noopener' : null}
    >
      {props.children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  blank: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
};

Link.defaultProps = {
  blank: false,
  onClick: false,
};

export default Link;
