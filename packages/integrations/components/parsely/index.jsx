import React from 'react';
import PropTypes from 'prop-types';

const Parsely = (props) => {
  const { site } = props;

  // It's possible for this to be an empty string if
  // setting is unconfigured. Do not render if this is the case.
  if (!site) {
    return null;
  }

  return (
    <>
      <script id="parsely-cfg" src={`//cdn.parsely.com/keys/${site}/p.js`} />
    </>
  );
};

Parsely.propTypes = {
  site: PropTypes.string.isRequired,
};

export default Parsely;
