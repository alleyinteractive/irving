import React from 'react';
import PropTypes from 'prop-types';

// centered box, with name as header, config as pre text, and children rendered
// how do we determine what components are connected? are they all connected?
// how do we render children?
const Placeholder = (props) => (
  <div>
    <h1></h1>
  </div>
);

Placeholder.propTypes = {
  name: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};
