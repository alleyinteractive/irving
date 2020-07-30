import React from 'react';
import PropTypes from 'prop-types';

const Parsely = (props) => {
  const { site } = props;

  // It's possible for this to be an empty string if
  // setting is unconfigured. Do not render if this is the case.
  if (! site) {
    return null;
  }

  return (
    <>
      <div id="parsely-root" style={{ display: 'none' }}>
        <span id="parsely-cfg" data-parsely-site={site} />
      </div>
      <script src="https://d1z2jf7jlzjs58.cloudfront.net/p.js" async defer />
    </>
  );
};

Parsely.propTypes = {
  site: PropTypes.string.isRequired,
};

export default Parsely;
