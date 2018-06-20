import { omit } from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = (props) => (
  <div>
    <h1>{props.name}</h1>
    <pre>{JSON.stringify(omit(['name', 'children'], props), null, 2)}</pre>
    {props.children}
  </div>
);

Placeholder.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Placeholder;
