import unset from 'lodash/fp/unset';

const encodeState = (state) => {
  const sanitizedState = unset('route.cookie', state);

  // https://redux.js.org/recipes/server-rendering#security-considerations
  return JSON.stringify(sanitizedState)
    .replace(/</g, '\\u003c');
};

export default encodeState;
