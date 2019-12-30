import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash/memoize';
import getRelativeUrl from 'utils/getRelativeUrl';
import history from 'utils/history';
import omit from 'lodash/fp/omit';

// Checking for a relative URL is expensive, memoize it.
const parseUrl = memoize(getRelativeUrl);

const Link = (props) => {
  const {
    to,
    blank,
    onClick,
    children,
  } = props;
  const relativeUrl = parseUrl(to);
  const defaultOnClick = (event) => {
    if (relativeUrl) {
      event.preventDefault();
      history.push(relativeUrl);
    }
  };

  return (
    <a
      {...omit([
        'blank',
        'to',
        'componentGroups',
        'componentName',
      ], props)}
      href={relativeUrl || to}
      onClick={onClick || defaultOnClick}
      target={blank ? '_blank' : null}
      rel={blank ? 'noopener' : null}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  /**
   * Destination for anchor tag (`href` attribute)
   */
  to: PropTypes.string.isRequired,
  /**
   * Should this link open in a new page/tab?
   */
  blank: PropTypes.bool,
  /**
   * Child nodes
   */
  children: PropTypes.node.isRequired,
  /**
   * OnClick function. NOTE: if provided, this will override
   * history push handling, so use with care.
   */
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
